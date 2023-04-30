import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { AgilityStakingPoolInfo } from './helper';

const Signatures: { [key: string]: string } = {
  Staked: '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
  Withdrawn: '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',
  RewardPaid: '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
};

export class AgilityAdapter extends Adapter {
  public readonly name: string = 'adapter.agility';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Staked]: EventSignatureMapping[Signatures.Staked],
      [Signatures.Withdrawn]: EventSignatureMapping[Signatures.Withdrawn],
      [Signatures.RewardPaid]: EventSignatureMapping[Signatures.RewardPaid],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let poolInfo: AgilityStakingPoolInfo | null = null;
      if (this.config.staticData) {
        for (const pool of this.config.staticData.pools) {
          if (compareAddress(pool.address, address)) {
            poolInfo = pool;
          }
        }
      }

      if (poolInfo) {
        const user = normalizeAddress(event.user);
        const token: Token = signature === Signatures.RewardPaid ? poolInfo.rewardToken : poolInfo.stakingToken;

        // hard code for now
        if (compareAddress(token.address, '0x498c00e1ccc2afff80f6cc6144eaeb95c46cc3b5')) {
          token.symbol = 'AGI/WETH LP';
        }

        const amount =
          signature === Signatures.RewardPaid
            ? new BigNumber(event.reward).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10)
            : new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
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
    }

    return null;
  }
}
