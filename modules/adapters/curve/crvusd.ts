import { CrvusdConfig, CrvusdMarket } from '../../../configs/protocols/curve';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { CrvusdEventSignatures, CurveAbiMappings } from './abis';

export default class CrvusdAdapter extends Adapter {
  public readonly name: string = 'adapter.crvusd';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = CurveAbiMappings;
  }

  protected getMarket(controllerAddress: string): CrvusdMarket | null {
    for (const market of (this.config as CrvusdConfig).contracts) {
      if (compareAddress(controllerAddress, market.address)) {
        return market as CrvusdMarket;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const market = this.getMarket(options.log.address);
      if (market) {
        switch (signature) {
          case CrvusdEventSignatures.Borrow: {
            const user = normalizeAddress(event.user);
            const loanAmount = formatFromDecimals(event.loan_increase.toString(), market.debtToken.decimals);
            const collateralAmount = formatFromDecimals(
              event.collateral_increase.toString(),
              market.collateralToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'borrow',
                addresses: [user],
                tokens: [market.debtToken],
                tokenAmounts: [loanAmount],
              })
            );
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [user],
                tokens: [market.collateralToken],
                tokenAmounts: [collateralAmount],
              })
            );

            break;
          }
          case CrvusdEventSignatures.Repay: {
            const user = normalizeAddress(event.user);
            const loanAmount = formatFromDecimals(event.loan_decrease.toString(), market.debtToken.decimals);
            const collateralAmount = formatFromDecimals(
              event.collateral_decrease.toString(),
              market.collateralToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'repay',
                addresses: [user],
                tokens: [market.debtToken],
                tokenAmounts: [loanAmount],
              })
            );
            actions.push({
              ...this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [user],
                tokens: [market.collateralToken],
                tokenAmounts: [collateralAmount],
              }),
              logIndex: `${options.log.logIndex}:1`,
            });

            break;
          }
          case CrvusdEventSignatures.RemoveCollateral: {
            const user = normalizeAddress(event.user);
            const collateralAmount = formatFromDecimals(
              event.collateral_decrease.toString(),
              market.collateralToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [user],
                tokens: [market.collateralToken],
                tokenAmounts: [collateralAmount],
              })
            );

            break;
          }
          case CrvusdEventSignatures.Liquidate: {
            const user = normalizeAddress(event.user);
            const liquidator = normalizeAddress(event.liquidator);

            const collateralAmount = formatFromDecimals(
              event.collateral_received.toString(),
              market.collateralToken.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'liquidate',
                addresses: [liquidator, user],
                tokens: [market.collateralToken],
                tokenAmounts: [collateralAmount],
              })
            );

            break;
          }
        }
      }
    }

    return actions;
  }
}
