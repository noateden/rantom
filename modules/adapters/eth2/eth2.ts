import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { fromLittleEndian64, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Deposit: '0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5',
};

export class Eth2Adapter extends Adapter {
  public readonly name: string = 'adapter.eth2';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
      EventSignatureMapping[signature]
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const amount = fromLittleEndian64(event.amount);
      return {
        protocol: this.config.protocol,
        action: 'deposit',
        tokens: [Tokens.ethereum.ETH],
        tokenAmounts: [amount],
        addresses: [normalizeAddress(options.sender), normalizeAddress(options.to)],
        readableString: `${normalizeAddress(event.sender)} deposit ${amount} ETH on ${this.config.protocol} chain ${
          options.chain
        }`,
        addition: {
          // identify which protocol is depositing by contract address
          contract: options.to ? options.to : null,

          pubkey: event.pubkey,
          withdrawalCredentials: event.withdrawal_credentials,
        },
      };
    }

    return null;
  }
}
