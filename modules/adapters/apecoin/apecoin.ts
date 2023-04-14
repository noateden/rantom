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
  Deposit: '0xe31c7b8d08ee7db0afa68782e1028ef92305caeea8626633ad44d413e30f6b2f',
  DepositNft: '0x8863bdbe28273fa04cbc67c9e51785cff607a419b43ee367e4c3c01edb1d7b56',
  Withdraw: '0x56c54ba9bd38d8fd62012e42c7ee564519b09763c426d331b3661b537ead19b2',
  WithdrawNft: '0x46916533b23d6665275e4143ec7eeb4b6b4ae92178ebbfe99f112564d2c7b1aa',
  ClaimRewards: '0x030f754a3e747235920c21afeca14e881b260d41c7e657ada6c0b049f7eebca9',
  ClaimRewardsNft: '0xd334b3114fc25cbd72389ff9c361d5f8b0924e35fa237c65ac209a2cdcf4ba13',
};

export class ApecoinAdapter extends Adapter {
  public readonly name: string = 'adapter.apecoin';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.DepositNft]: EventSignatureMapping[Signatures.DepositNft],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.WithdrawNft]: EventSignatureMapping[Signatures.WithdrawNft],
      [Signatures.ClaimRewards]: EventSignatureMapping[Signatures.ClaimRewards],
      [Signatures.ClaimRewardsNft]: EventSignatureMapping[Signatures.ClaimRewardsNft],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let action: KnownAction = 'deposit';
      if (signature === Signatures.Withdraw || signature === Signatures.WithdrawNft) {
        action = 'withdraw';
      }
      if (signature === Signatures.ClaimRewards || signature === Signatures.ClaimRewardsNft) {
        action = 'collect';
      }

      const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
      const user = normalizeAddress(event.user);

      return {
        protocol: this.config.protocol,
        action: action,
        tokens: [Tokens.ethereum.APE],
        tokenAmounts: [amount],
        addresses: [user],
        readableString: `${user} ${action} ${amount} APE on ${this.config.protocol} chain ${options.chain}`,
      };
    }

    return null;
  }
}
