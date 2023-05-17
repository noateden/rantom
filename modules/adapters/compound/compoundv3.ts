import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import CometAbi from '../../../configs/abi/compound/Comet.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { CompoundMarketInfoV3 } from './helper';

const Signatures = {
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  SupplyV3: '0xd1cf3d156d5f8f0d50f6c122ed609cec09d35c9b9fb3fff6ea0959134dae424e',
  WithdrawV3: '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb',
  SupplyCollateralV3: '0xfa56f7b24f17183d81894d3ac2ee654e3c26388d17a28dbd9549b8114304e1f4',
  WithdrawCollateralV3: '0xd6d480d5b3068db003533b170d67561494d72e3bf9fa40a266471351ebba9e16',
  AbsorbCollateral: '0x9850ab1af75177e4a9201c65a2cf7976d5d28e40ef63494b44366f86b2f9412e',
  RewardClaimed: '0x2422cac5e23c46c890fdcf42d0c64757409df6832174df639337558f09d99c68',
};

export class Compoundv3Adapter extends Adapter {
  public readonly name: string = 'adapter.compound3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.SupplyV3]: EventSignatureMapping[Signatures.SupplyV3],
      [Signatures.WithdrawV3]: EventSignatureMapping[Signatures.WithdrawV3],
      [Signatures.SupplyCollateralV3]: EventSignatureMapping[Signatures.SupplyCollateralV3],
      [Signatures.WithdrawCollateralV3]: EventSignatureMapping[Signatures.WithdrawCollateralV3],
      [Signatures.AbsorbCollateral]: EventSignatureMapping[Signatures.AbsorbCollateral],
      [Signatures.RewardClaimed]: EventSignatureMapping[Signatures.RewardClaimed],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.RewardClaimed) {
        const claimer = normalizeAddress(event.src);
        const recipient = normalizeAddress(event.recipient);
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'collect',
          addresses: [claimer, recipient],
          tokens: [Tokens.ethereum.COMP],
          tokenAmounts: [amount],
          readableString: `${claimer} collect ${amount} COMP on ${this.config.protocol} chain ${chain}`,
        };
      }

      const context = await web3.eth.getTransactionReceipt(options.hash as string);
      let poolConfig: CompoundMarketInfoV3 | null = null;
      if (this.config.staticData.pools) {
        for (const pool of this.config.staticData.pools) {
          if (compareAddress(address, pool.address)) {
            poolConfig = pool as CompoundMarketInfoV3;
          }
        }
      }

      // v3 processing
      let token = null;
      let action: KnownAction = 'deposit';
      switch (signature) {
        case Signatures.SupplyV3:
        case Signatures.WithdrawV3: {
          if (poolConfig) {
            token = poolConfig.baseToken;
          } else {
            const baseTokenAddr = await rpcWrapper.queryContract({
              chain,
              abi: CometAbi,
              contract: address,
              method: 'baseToken',
              params: [],
            });
            token = await this.getWeb3Helper().getErc20Metadata(chain, baseTokenAddr);
          }

          if (signature === Signatures.SupplyV3) {
            action = 'repay';

            // on compound v3, we detect supply transaction by looking Transfer event from the same transaction
            // when user deposit base asset, if there is a Transfer event emitted on transaction,
            // the transaction action is deposit, otherwise, the transaction action is repay.
            if (context) {
              for (const log of context.logs) {
                if (
                  log.topics[0] === Signatures.Transfer &&
                  this.config.contracts[chain].indexOf(normalizeAddress(log.address)) !== -1
                ) {
                  // supply transaction
                  action = 'deposit';
                }
              }
            }
          } else {
            action = 'borrow';

            // we detect a withdrawal transaction by looking for Transfer to zero address event
            if (context) {
              for (const log of context.logs) {
                if (
                  log.topics[0] === Signatures.Transfer &&
                  this.config.contracts[chain].indexOf(normalizeAddress(log.address)) !== -1
                ) {
                  // withdraw transaction
                  action = 'withdraw';
                }
              }
            }
          }
          break;
        }
        case Signatures.SupplyCollateralV3:
        case Signatures.WithdrawCollateralV3: {
          if (poolConfig) {
            for (const collateral of poolConfig.collaterals) {
              if (compareAddress(collateral.address, event.asset)) {
                token = collateral;
              }
            }
          } else {
            token = await this.getWeb3Helper().getErc20Metadata(chain, event.asset);
          }

          action = signature === Signatures.SupplyCollateralV3 ? 'deposit' : 'withdraw';

          break;
        }

        case Signatures.AbsorbCollateral: {
          if (poolConfig) {
            for (const collateral of poolConfig.collaterals) {
              if (compareAddress(collateral.address, event.asset)) {
                token = collateral;
              }
            }
          } else {
            token = await this.getWeb3Helper().getErc20Metadata(chain, event.asset);
          }

          action = 'liquidate';

          break;
        }
      }

      if (token) {
        let user = event.from ? normalizeAddress(event.from) : normalizeAddress(event.src);
        if (signature === Signatures.AbsorbCollateral) {
          user = normalizeAddress(event.absorber);
        }

        const amount = event.amount
          ? new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10)
          : new BigNumber(event.collateralAbsorbed).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: action as KnownAction,
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
