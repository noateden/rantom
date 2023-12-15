import { GearboxConfig, GearboxLiquidityPool } from '../../../configs/protocols/gearbox';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { GearboxAbiMappings, GearboxEventSignatures } from './abis';

export default class GearboxAdapter extends Adapter {
  public readonly name: string = 'adapter.gearbox';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = GearboxAbiMappings;
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

      let pool: GearboxLiquidityPool | undefined = (this.config as GearboxConfig).contracts.filter(
        (item) => item.chain === options.chain && compareAddress(item.address, options.log.address)
      )[0];
      if (pool) {
        switch (signature) {
          case GearboxEventSignatures.AddLiquidity:
          case GearboxEventSignatures.RemoveLiquidity: {
            const sender = normalizeAddress(event.sender);
            const to = normalizeAddress(event.to ? event.to : event.onBehalfOf);
            const amount = formatFromDecimals(event.amount.toString(), pool.token.decimals);
            const action: KnownAction = signature === GearboxEventSignatures.AddLiquidity ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action,
                addresses: [sender, to],
                tokens: [pool.token],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case GearboxEventSignatures.Borrow:
          case GearboxEventSignatures.Repay: {
            const creditAccount = normalizeAddress(event.creditAccount);
            const creditManager = normalizeAddress(event.creditManager);
            const amount = formatFromDecimals(
              event.amount ? event.amount.toString() : event.borrowedAmount.toString(),
              pool.token.decimals
            );
            const action: KnownAction = signature === GearboxEventSignatures.Borrow ? 'borrow' : 'repay';

            actions.push(
              this.buildUpAction({
                ...options,
                action,
                addresses:
                  signature === GearboxEventSignatures.Borrow ? [creditAccount, creditManager] : [creditManager],
                tokens: [pool.token],
                tokenAmounts: [amount],
              })
            );

            break;
          }
          case GearboxEventSignatures.Claimed: {
            const account = normalizeAddress(event.account);
            const amount = formatFromDecimals(event.amount.toString(), pool.token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'collect',
                addresses: [account],
                tokens: [pool.token],
                tokenAmounts: [amount],
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
