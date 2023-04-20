import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { ConvexHelper } from './helper';

const Signatures: { [key: string]: string } = {
  Deposit: '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  Withdraw: '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
  CvxStaked: '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // CVX stake
  CvxWithdrawn: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // CVX unstake
  CvxRewardPaid: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // CVX RewardPaid
};

export class ConvexAdapter extends Adapter {
  public readonly name: string = 'adapter.convex';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.CvxStaked]: EventSignatureMapping[Signatures.CvxStaked],
      [Signatures.CvxWithdrawn]: EventSignatureMapping[Signatures.CvxWithdrawn],
      [Signatures.CvxRewardPaid]: EventSignatureMapping[Signatures.CvxRewardPaid],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
        try {
          let poolConfig = null;
          if (this.config.staticData && this.config.staticData.pools) {
            for (const pool of this.config.staticData.pools) {
              if (chain === pool.chain && Number(event.poolid) === pool.poolId) {
                poolConfig = pool;
              }
            }
          } else {
            poolConfig = await ConvexHelper.getBoosterPool(chain, address, Number(event.poolid));
          }

          if (poolConfig) {
            const user = normalizeAddress(event.user);
            const amount = new BigNumber(event.amount)
              .dividedBy(new BigNumber(10).pow(poolConfig.lpToken.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
              tokens: [poolConfig.lpToken],
              tokenAmounts: [amount],
              addresses: [user],
              readableString: `${user} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
                poolConfig.lpToken.symbol
              } on ${this.config.protocol} chain ${options.chain}`,
            };
          }
        } catch (e: any) {
          logger.onError({
            service: this.name,
            message: 'failed to parse event data',
            props: {
              protocol: this.config.protocol,
              signature: signature,
              address: normalizeAddress(address),
              error: e.message,
            },
          });
        }
      } else if (
        signature === Signatures.CvxStaked ||
        signature === Signatures.CvxWithdrawn ||
        signature === Signatures.CvxRewardPaid
      ) {
        const amount = event.amount
          ? new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10)
          : new BigNumber(event.reward.toString()).dividedBy(1e18).toString(10);
        let token = Tokens.ethereum.CRV;
        if (signature !== Signatures.CvxRewardPaid) {
          if (compareAddress(address, '0xcf50b810e57ac33b91dcf525c6ddd9881b139332')) {
            token = Tokens.ethereum.CVX;
          }
          if (compareAddress(address, '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e')) {
            token = Tokens.ethereum.cvxCRV;
          }
        }

        const user = normalizeAddress(event.user);
        const action: KnownAction =
          signature === Signatures.CvxStaked
            ? 'deposit'
            : signature === Signatures.CvxWithdrawn
            ? 'withdraw'
            : 'collect';

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [user],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
