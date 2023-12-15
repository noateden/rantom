import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Uniswapv2Adapter from '../uniswap/uniswapv2';
import { SushiAbiMappings, SushiEventSignatures } from './abis';

// SushiAdapter extends UniswapAdapter
// and implements Masterchef actions
export default class SushiAdapter extends Uniswapv2Adapter {
  public readonly name: string = 'adapter.sushi';

  protected readonly rewardToken: Token = {
    chain: 'ethereum',
    symbol: 'SUSHI',
    decimals: 18,
    address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
  };

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.eventMappings[SushiEventSignatures.MasterchefDeposit] =
      SushiAbiMappings[SushiEventSignatures.MasterchefDeposit];
    this.eventMappings[SushiEventSignatures.MasterchefWithdraw] =
      SushiAbiMappings[SushiEventSignatures.MasterchefWithdraw];
    this.eventMappings[SushiEventSignatures.MasterchefEmergencyWithdraw] =
      SushiAbiMappings[SushiEventSignatures.MasterchefEmergencyWithdraw];

    this.eventMappings[SushiEventSignatures.MasterchefDepositV2] =
      SushiAbiMappings[SushiEventSignatures.MasterchefDepositV2];
    this.eventMappings[SushiEventSignatures.MasterchefWithdrawV2] =
      SushiAbiMappings[SushiEventSignatures.MasterchefWithdrawV2];
    this.eventMappings[SushiEventSignatures.MasterchefEmergencyWithdrawV2] =
      SushiAbiMappings[SushiEventSignatures.MasterchefEmergencyWithdrawV2];

    this.eventMappings[SushiEventSignatures.MasterchefHarvest] =
      SushiAbiMappings[SushiEventSignatures.MasterchefHarvest];
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions = await super.parseEventLog(options);
    if (actions.length > 0) {
      return actions;
    }

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      const stakingPool = await this.services.datastore.getStakingPoolConstant({
        chain: options.chain,
        protocol: this.config.protocol,
        address: options.log.address,
        poolId: Number(event.pid),
      });

      if (stakingPool) {
        switch (signature) {
          case SushiEventSignatures.MasterchefDeposit:
          case SushiEventSignatures.MasterchefDepositV2: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'deposit',
                addresses: [normalizeAddress(event.user)],
                tokens: [stakingPool.token],
                tokenAmounts: [formatFromDecimals(event.amount.toString(), stakingPool.token.decimals)],
              })
            );
            break;
          }
          case SushiEventSignatures.MasterchefWithdraw:
          case SushiEventSignatures.MasterchefWithdrawV2:
          case SushiEventSignatures.MasterchefEmergencyWithdraw:
          case SushiEventSignatures.MasterchefEmergencyWithdrawV2: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'withdraw',
                addresses: [normalizeAddress(event.user)],
                tokens: [stakingPool.token],
                tokenAmounts: [formatFromDecimals(event.amount.toString(), stakingPool.token.decimals)],
              })
            );
            break;
          }
          case SushiEventSignatures.MasterchefHarvest: {
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'collect',
                addresses: [normalizeAddress(event.user)],
                tokens: [this.rewardToken],
                tokenAmounts: [formatFromDecimals(event.amount.toString(), this.rewardToken.decimals)],
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
