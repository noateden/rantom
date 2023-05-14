import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  StakeConfirmed: '0x995d6cdbf356b73aa4dff24e951558cc155c9bb0397786ec4a142f9470f50007',
  PendingUnstake: '0xc5130045b6f6c9e2944ccea448ad17c279db68237b8aa856ee12cbfaa25f7715',
  RewardsDistributed: '0xe69d325558610ba73c441901deb46d7f251108348dc5dc9447e8866774c12edc',
  RewardsClaimed: '0x9310ccfcb8de723f578a9e4282ea9f521f05ae40dc08f3068dfad528a65ee3c7',
};

export class AnkrAdapter extends Adapter {
  public readonly name: string = 'adapter.ankr';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.StakeConfirmed]: EventSignatureMapping[Signatures.StakeConfirmed],
      [Signatures.PendingUnstake]: EventSignatureMapping[Signatures.PendingUnstake],
      [Signatures.RewardsDistributed]: EventSignatureMapping[Signatures.RewardsDistributed],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.StakeConfirmed || signature === Signatures.PendingUnstake) {
        let action: KnownAction = signature === Signatures.StakeConfirmed ? 'deposit' : 'withdraw';

        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
        const user = event.staker ? normalizeAddress(event.staker) : normalizeAddress(event.ownerAddress);

        return {
          protocol: this.config.protocol,
          action: action,
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [user],
          readableString: `${user} ${action} ${amount} ETH on ${this.config.protocol} chain ${options.chain}`,
        };
      } else if (signature === Signatures.RewardsDistributed) {
        const claimers = event.claimers as unknown as Array<string>;
        
        if (claimers.length > 0) {
          const amounts: Array<string> = [];
          const addresses: Array<string> = [];
          claimers.map((item, index) => {
            amounts.push(new BigNumber(event.amounts[index].toString()).dividedBy(1e18).toString(10));
            addresses.push(normalizeAddress(item));
          });

          return {
            protocol: this.config.protocol,
            action: 'collect',
            tokens: [Tokens.ethereum.ETH],
            tokenAmounts: amounts,
            addresses: addresses,
            readableString: `${addresses.length} addresses collect ETH on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      } else if (signature === Signatures.RewardsClaimed) {
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
        const user = normalizeAddress(event.claimer);

        return {
          protocol: this.config.protocol,
          action: 'collect',
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [user],
          readableString: `${user} collects ${amount} ETH on ${this.config.protocol} chain ${options.chain}`,
        };
      }
    }

    return null;
  }
}
