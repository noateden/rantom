import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { ConvexHelper } from './helper';

const Signatures: { [key: string]: string } = {
  Deposit: '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  Withdraw: '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',

  Staked: '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d', // CVX stake
  Withdrawn: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5', // CVX unstake
  RewardPaid: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486', // CVX RewardPaid

  CvxLockerStaked: '0xb4caaf29adda3eefee3ad552a8e85058589bf834c7466cae4ee58787f70589ed',
  CvxLockerStakedV2: '0x9cfd25589d1eb8ad71e342a86a8524e83522e3936c0803048c08f6d9ad974f40',
  CvxLockerStakedAura: '0x1449c6dd7851abc30abf37f57715f492010519147cc2652fbc38202c18a6ee90',
  CvxLockerUnstaked: '0x2fd83d5e9f5d240bed47a97a24cf354e4047e25edc2da27b01fd95e5e8a0c9a5',
};

export class ConvexAdapter extends Adapter {
  public readonly name: string = 'adapter.convex';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.Staked]: EventSignatureMapping[Signatures.Staked],
      [Signatures.Withdrawn]: EventSignatureMapping[Signatures.Withdrawn],
      [Signatures.RewardPaid]: EventSignatureMapping[Signatures.RewardPaid],
      [Signatures.CvxLockerStaked]: EventSignatureMapping[Signatures.CvxLockerStaked],
      [Signatures.CvxLockerStakedV2]: EventSignatureMapping[Signatures.CvxLockerStakedV2],
      [Signatures.CvxLockerStakedAura]: EventSignatureMapping[Signatures.CvxLockerStakedAura],
      [Signatures.CvxLockerUnstaked]: EventSignatureMapping[Signatures.CvxLockerUnstaked],
    });
  }

  protected getStakingToken(chain: string, stakingContract: string): Token | null {
    switch (chain) {
      case 'ethereum': {
        switch (stakingContract) {
          case '0xcf50b810e57ac33b91dcf525c6ddd9881b139332': {
            return Tokens.ethereum.CVX;
          }
          case '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e': {
            return Tokens.ethereum.cvxCRV;
          }
        }
      }
    }

    return null;
  }

  protected getRewardToken(chain: string, stakingContract: string): Token | null {
    switch (chain) {
      case 'ethereum': {
        switch (stakingContract) {
          case '0xcf50b810e57ac33b91dcf525c6ddd9881b139332': {
            return Tokens.ethereum.CRV;
          }
          case '0x3fe65692bfcd0e6cf84cb1e7d24108e434a7587e': {
            return Tokens.ethereum.CRV;
          }
        }
      }
    }

    return null;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
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
        signature === Signatures.Staked ||
        signature === Signatures.Withdrawn ||
        signature === Signatures.RewardPaid
      ) {
        const amount = event.amount
          ? new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10)
          : new BigNumber(event.reward.toString()).dividedBy(1e18).toString(10);
        let token = this.getRewardToken(chain, address);
        if (signature !== Signatures.RewardPaid) {
          token = this.getStakingToken(chain, address);
        }

        if (token) {
          const user = normalizeAddress(event.user);
          const action: KnownAction =
            signature === Signatures.Staked ? 'deposit' : signature === Signatures.Withdrawn ? 'withdraw' : 'collect';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [user],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (
        signature === Signatures.CvxLockerStaked ||
        signature === Signatures.CvxLockerStakedV2 ||
        signature === Signatures.CvxLockerStakedAura ||
        signature === Signatures.CvxLockerUnstaked
      ) {
        const user = normalizeAddress(event._user);
        const token: Token = this.config.staticData.rewardToken[chain];
        const action: KnownAction = signature === Signatures.CvxLockerUnstaked ? 'unlock' : 'lock';
        const amount = event._lockedAmount
          ? new BigNumber(event._lockedAmount.toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10)
          : new BigNumber(event._amount.toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [user],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    } else if (signature === Signatures.RewardPaid) {
      for (const pool of this.config.staticData.pools) {
        if (compareAddress(pool.rewardPool, address)) {
          // claim reward token on crvReward contracts
          const user = normalizeAddress(event.user);
          const amount = new BigNumber(event.reward)
            .dividedBy(new BigNumber(10).pow(pool.rewardToken.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'collect',
            tokens: [pool.rewardToken],
            tokenAmounts: [amount],
            addresses: [user],
            readableString: `${user} collect ${amount} ${pool.rewardToken.symbol} on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      }
    }

    return null;
  }
}
