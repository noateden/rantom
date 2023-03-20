import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { ConvexHelper } from './helper';

const Signatures: { [key: string]: string } = {
  Deposit: '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  Withdraw: '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
};

export class ConvexAdapter extends Adapter {
  public readonly name: string = 'adapter.convex';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
      if (
        this.config.contracts[chain] &&
        this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
        EventSignatureMapping[signature].abi
      ) {
        try {
          const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
          const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

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
      }
    }

    return null;
  }
}
