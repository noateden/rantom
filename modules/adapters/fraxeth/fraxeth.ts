import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  ETHSubmitted: '0x29b3e86ecfd94a32218997c40b051e650e4fd8c97fc7a4d266be3f7c61c5205b',
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
};

export class FraxethAdapter extends Adapter {
  public readonly name: string = 'adapter.fraxeth';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.ETHSubmitted]: EventSignatureMapping[Signatures.ETHSubmitted],
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.ETHSubmitted) {
        const sender = normalizeAddress(event.sender);
        const amount = new BigNumber(event.sent_amount.toString()).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'deposit',
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [sender],
          readableString: `${sender} deposit ${amount} ETH on ${this.config.protocol} chain ${chain}`,
        };
      } else {
        const sender = normalizeAddress(event.caller);
        const amount = new BigNumber(event.assets.toString()).dividedBy(1e18).toString(10);
        return {
          protocol: this.config.protocol,
          action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
          tokens: [Tokens.ethereum.frxETH],
          tokenAmounts: [amount],
          addresses: [sender],
          readableString: `${sender} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
            Tokens.ethereum.frxETH
          } on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
