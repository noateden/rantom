import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero, Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Submitted: '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
  SubmitEvent: '0x98d2bc018caf34c71a8f920d9d93d4ed62e9789506b74087b48570c17b28ed99',
  ClaimTokensEvent: '0xaca94a3466fab333b79851ab29b0715612740e4ae0d891ef8e9bd2a1bf5e24dd',
  WithdrawalClaimed: '0x6ad26c5e238e7d002799f9a5db07e81ef14e37386ae03496d7a7ef04713e145b',
};

export class LidoAdapter extends Adapter {
  public readonly name: string = 'adapter.lido';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Submitted]: EventSignatureMapping[Signatures.Submitted],
      [Signatures.SubmitEvent]: EventSignatureMapping[Signatures.SubmitEvent],
      [Signatures.ClaimTokensEvent]: EventSignatureMapping[Signatures.ClaimTokensEvent],
      [Signatures.WithdrawalClaimed]: EventSignatureMapping[Signatures.WithdrawalClaimed],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      // found action on this protocol
      if (signature === Signatures.Submitted) {
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
        return {
          protocol: this.config.protocol,
          action: 'deposit',
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [normalizeAddress(event.sender), normalizeAddress(event.referral)],
          readableString: `${normalizeAddress(event.sender)} stakes ${amount} ETH${
            compareAddress(event.referral, AddressZero)
              ? ''
              : ' using referral address ' + normalizeAddress(event.referral)
          } on ${this.config.protocol} chain ${options.chain}`,
        };
      } else if (signature === Signatures.WithdrawalClaimed) {
        const owner = normalizeAddress(event.owner);
        const receiver = normalizeAddress(event.receiver);
        const amount = new BigNumber(event.amountOfETH).dividedBy(1e18).toString(10);
        return {
          protocol: this.config.protocol,
          action: 'withdraw',
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [owner, receiver],
          readableString: `${owner} withdraw ${amount} ETH on ${this.config.protocol} chain ${options.chain}`,
        };
      } else if (signature === Signatures.SubmitEvent) {
        const amount = new BigNumber(event._amount).dividedBy(1e18).toString(10);
        const user = normalizeAddress(event._from);
        const referral = normalizeAddress(event._referral);
        return {
          protocol: this.config.protocol,
          action: 'deposit',
          tokens: [Tokens.ethereum.MATIC],
          tokenAmounts: [amount],
          addresses: [user, referral],
          readableString: `${user} deposit ${amount} MATIC on ${this.config.protocol} chain ${options.chain}`,
        };
      } else if (signature === Signatures.ClaimTokensEvent) {
        const amount = new BigNumber(event._amountClaimed).dividedBy(1e18).toString(10);
        const user = normalizeAddress(event._from);
        return {
          protocol: this.config.protocol,
          action: 'withdraw',
          tokens: [Tokens.ethereum.MATIC],
          tokenAmounts: [amount],
          addresses: [user],
          readableString: `${user} withdraw ${amount} MATIC on ${this.config.protocol} chain ${options.chain}`,
        };
      }
    }

    return null;
  }
}
