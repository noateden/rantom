import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { ConvexAbiMappings, ConvexEventSignatures } from './abis';

export default class ConvexAdapter extends Adapter {
  public readonly name: string = 'adapter.convex';

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.eventMappings = ConvexAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);

    if (this.supportedContract(options.chain, options.log.address)) {
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case ConvexEventSignatures.Deposit:
        case ConvexEventSignatures.Withdraw: {
          const poolId = Number(event.poolid);
          const stakingPool = await this.services.datastore.getStakingPoolConstant({
            chain: options.chain,
            protocol: this.config.protocol,
            address: options.log.address,
            poolId: poolId,
          });

          if (stakingPool) {
            const amount = formatFromDecimals(event.amount, stakingPool.token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: signature === ConvexEventSignatures.Deposit ? 'deposit' : 'withdraw',
                addresses: [normalizeAddress(event.user)],
                tokens: [stakingPool.token],
                tokenAmounts: [amount],
              })
            );
          }
          break;
        }
        case ConvexEventSignatures.Staked:
        case ConvexEventSignatures.Withdrawn:
        case ConvexEventSignatures.RewardPaid: {
          let token: Token | null = null;

          const stakingPool = await this.services.datastore.getStakingPoolConstant({
            chain: options.chain,
            protocol: this.config.protocol,
            address: options.log.address,
          });
          if (stakingPool) {
            if (signature === ConvexEventSignatures.RewardPaid) {
              token = stakingPool.rewardToken ? stakingPool.rewardToken : null;
            } else {
              token = stakingPool.token;
            }
          }

          if (token) {
            const user = normalizeAddress(event.user);
            let action: KnownAction = 'deposit';
            if (signature === ConvexEventSignatures.Withdrawn) {
              action = 'withdraw';
            } else if (signature === ConvexEventSignatures.RewardPaid) {
              action = 'collect';
            }

            const amount = formatFromDecimals(
              event.amount ? event.amount.toString() : event.reward.toString(),
              token.decimals
            );

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
          break;
        }
        case ConvexEventSignatures.CvxLockerStaked:
        case ConvexEventSignatures.CvxLockerStakedV2:
        case ConvexEventSignatures.AuraLockerStakedV2:
        case ConvexEventSignatures.CvxLockerUnstaked: {
          const stakingPool = await this.services.datastore.getStakingPoolConstant({
            chain: options.chain,
            protocol: this.config.protocol,
            address: options.log.address,
          });
          if (stakingPool) {
            const user = normalizeAddress(event._user);
            const amount = formatFromDecimals(
              event._lockedAmount ? event._lockedAmount.toString() : event._amount.toString(),
              stakingPool.token.decimals
            );
            const action: KnownAction = signature === ConvexEventSignatures.CvxLockerUnstaked ? 'unlock' : 'lock';
            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [stakingPool.token],
                tokenAmounts: [amount],
              })
            );
          }

          break;
        }
        case ConvexEventSignatures.CvxLockerRewardPaid: {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event._rewardsToken,
          });
          if (token) {
            const amount = formatFromDecimals(event._reward.toString(), token.decimals);
            actions.push(
              this.buildUpAction({
                ...options,
                action: 'collect',
                addresses: [normalizeAddress(event._user)],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
          break;
        }
      }
    } else if (signature === ConvexEventSignatures.RewardPaid || signature === ConvexEventSignatures.RewardPaidV2) {
      // RewardPaid event on rewardContract in staking pool in datastore
      const stakingPool = await this.services.datastore.getStakingPoolConstant({
        chain: options.chain,
        protocol: this.config.protocol,
        address: options.log.address,
        rewardContract: options.log.address,
      });

      if (stakingPool && stakingPool.protocol === this.config.protocol) {
        const event = web3.eth.abi.decodeLog(
          this.eventMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );

        if (signature === ConvexEventSignatures.RewardPaid) {
          const token = stakingPool.rewardToken as Token;
          const user = normalizeAddress(event.user);
          const amount = formatFromDecimals(event.reward.toString(), token.decimals);

          actions.push(
            this.buildUpAction({
              ...options,
              action: 'collect',
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
            })
          );
        } else {
          const token = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: event._rewardToken,
          });
          if (token) {
            const user = normalizeAddress(event._user);
            const receiver = normalizeAddress(event._receiver);
            const amount = formatFromDecimals(event._rewardAmount.toString(), token.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: 'collect',
                addresses: [user, receiver],
                tokens: [token],
                tokenAmounts: [amount],
              })
            );
          }
        }
      }
    }

    return actions;
  }
}
