import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import AuraRewardPoolAbi from '../../../configs/abi/aurafinance/RewardVault.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { ConvexHelper } from '../convex/helper';

const Signatures: { [key: string]: string } = {
  Deposit: '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  Withdraw: '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
  Collect: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
};

export class AurafinanceAdapter extends Adapter {
  public readonly name: string = 'adapter.aurafinance';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Collect]: EventSignatureMapping[Signatures.Collect],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (signature === Signatures.Deposit || signature === Signatures.Withdraw || signature === Signatures.Collect) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      try {
        switch (signature) {
          case Signatures.Collect: {
            const operatorAddr = await rpcWrapper.queryContract({
              chain,
              abi: AuraRewardPoolAbi,
              contract: address,
              method: 'operator',
              params: [],
            });

            if (this.config.contracts[chain].indexOf(normalizeAddress(operatorAddr)) !== -1) {
              const rewardTokenAddr = await rpcWrapper.queryContract({
                chain,
                abi: AuraRewardPoolAbi,
                contract: address,
                method: 'rewardToken',
                params: [],
              });
              const token = await this.getWeb3Helper().getErc20Metadata(chain, rewardTokenAddr);
              if (token) {
                const user = normalizeAddress(event.user);
                const amount = new BigNumber(event.reward)
                  .dividedBy(new BigNumber(10).pow(token.decimals))
                  .toString(10);
                return {
                  protocol: this.config.protocol,
                  action: 'collect',
                  tokens: [token],
                  tokenAmounts: [amount],
                  addresses: [user],
                  readableString: `${user} collect ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
                };
              }
            }
            break;
          }
          default: {
            if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
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
            }
          }
        }
      } catch (e: any) {
        logger.onWarn({
          service: this.name,
          message: 'cannot get event data',
          props: {
            protocol: this.config.protocol,
            signature: signature,
            address: normalizeAddress(address),
            error: e.message,
          },
        });
      }
    }

    return null;
  }
}
