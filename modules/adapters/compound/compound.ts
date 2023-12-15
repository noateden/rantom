import BigNumber from 'bignumber.js';

import { TokenList } from '../../../configs';
import CompoundCTokenAbi from '../../../configs/abi/compound/cErc20.json';
import { CompoundConfig, CompoundMarket } from '../../../configs/protocols/compound';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CompoundAbiMappings, CompoundEventSignatures } from './abis';

export default class CompoundAdapter extends Adapter {
  public readonly name: string = 'adapter.compound';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = {
      [CompoundEventSignatures.Mint]: CompoundAbiMappings[CompoundEventSignatures.Mint],
      [CompoundEventSignatures.Redeem]: CompoundAbiMappings[CompoundEventSignatures.Redeem],
      [CompoundEventSignatures.Borrow]: CompoundAbiMappings[CompoundEventSignatures.Borrow],
      [CompoundEventSignatures.Repay]: CompoundAbiMappings[CompoundEventSignatures.Repay],
      [CompoundEventSignatures.Liquidate]: CompoundAbiMappings[CompoundEventSignatures.Liquidate],
      [CompoundEventSignatures.DistributedSupplierComp]:
        CompoundAbiMappings[CompoundEventSignatures.DistributedSupplierComp],
      [CompoundEventSignatures.DistributedBorrowerComp]:
        CompoundAbiMappings[CompoundEventSignatures.DistributedBorrowerComp],
    };
  }

  protected getUnderlyingToken(cTokenAddress: string): Token | null {
    for (const market of (this.config as CompoundConfig).contracts) {
      if (compareAddress(cTokenAddress, market.address)) {
        return (market as CompoundMarket).underlying;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address) && options.log.topics.length === 1) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      if (
        signature === CompoundEventSignatures.DistributedSupplierComp ||
        signature === CompoundEventSignatures.DistributedBorrowerComp
      ) {
        const collector = event.supplier ? normalizeAddress(event.supplier) : normalizeAddress(event.borrower);
        const amount = formatFromDecimals(event.compDelta.toString(), 18);
        actions.push(
          this.buildUpAction({
            ...options,
            action: 'collect',
            addresses: [collector],
            tokens: [TokenList.ethereum.COMP],
            tokenAmounts: [amount],
          })
        );
      } else {
        const token = this.getUnderlyingToken(options.log.address);
        if (token) {
          switch (signature) {
            case CompoundEventSignatures.Mint:
            case CompoundEventSignatures.Redeem:
            case CompoundEventSignatures.Borrow: {
              const user = normalizeAddress(event[0]);
              const amount = formatFromDecimals(event[1].toString(), token.decimals);

              const action: KnownAction =
                signature === CompoundEventSignatures.Mint
                  ? 'deposit'
                  : signature === CompoundEventSignatures.Redeem
                  ? 'withdraw'
                  : 'borrow';

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: action,
                  addresses: [user],
                  tokens: [token],
                  tokenAmounts: [amount],
                })
              );

              break;
            }
            case CompoundEventSignatures.Repay: {
              const payer = normalizeAddress(event.payer);
              const borrower = normalizeAddress(event.borrower);
              const amount = formatFromDecimals(event.repayAmount.toString(), token.decimals);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: 'repay',
                  addresses: [payer, borrower],
                  tokens: [token],
                  tokenAmounts: [amount],
                })
              );

              break;
            }
            case CompoundEventSignatures.Liquidate: {
              const liquidator = normalizeAddress(event.liquidator);
              const borrower = normalizeAddress(event.borrower);

              // find the matching cTokenCollateral
              const collateralToken: Token | null = this.getUnderlyingToken(event.cTokenCollateral);
              if (collateralToken) {
                const exchangeRateCurrent = await this.services.blockchain.singlecall({
                  chain: options.chain,
                  abi: CompoundCTokenAbi,
                  target: event.cTokenCollateral,
                  method: 'exchangeRateCurrent',
                  params: [],
                  blockNumber: options.log.blockNumber,
                });
                const mantissa = 18 + collateralToken.decimals - 8;
                const oneCTokenInUnderlying = new BigNumber(exchangeRateCurrent).dividedBy(
                  new BigNumber(10).pow(mantissa)
                );
                const amount = new BigNumber(event.seizeTokens)
                  .multipliedBy(oneCTokenInUnderlying)
                  .dividedBy(1e8)
                  .toString(10);

                actions.push(
                  this.buildUpAction({
                    ...options,
                    action: 'liquidate',
                    addresses: [liquidator, borrower],
                    tokens: [collateralToken],
                    tokenAmounts: [amount],
                  })
                );

                break;
              }
            }
          }
        }
      }
    }

    return actions;
  }
}
