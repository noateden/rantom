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
  Register: '0xca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f',
  ReNew: '0x3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae',
};

export class EnsAdapter extends Adapter {
  public readonly name: string = 'adapter.ens';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Register]: EventSignatureMapping[Signatures.Register],
      [Signatures.ReNew]: EventSignatureMapping[Signatures.ReNew],
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

      if (signature === Signatures.Register) {
        const owner = normalizeAddress(event.owner);
        const amount = new BigNumber(event.cost).dividedBy(1e18).toString(10);
        const expired = Number(event.expires);

        return {
          protocol: this.config.protocol,
          action: 'register',
          addresses: [owner],
          tokens: [Tokens.ethereum.NativeCoin],
          tokenAmounts: [amount],
          addition: {
            name: event.name,
            expired: expired,
          },
          readableString: `${owner} register ${event.name} cost ${amount} ${
            Tokens.ethereum.NativeCoin.symbol
          } expired date ${new Date(expired * 1000).toISOString()} on ${this.config.protocol} chain ${chain}`,
        };
      } else if (signature === Signatures.ReNew) {
        const amount = new BigNumber(event.cost).dividedBy(1e18).toString(10);
        const expired = Number(event.expires);
        return {
          protocol: this.config.protocol,
          action: 'renew',
          addresses: [normalizeAddress(options.sender)],
          tokens: [Tokens.ethereum.NativeCoin],
          tokenAmounts: [amount],
          addition: {
            name: event.name,
            expired: expired,
          },
          readableString: `${normalizeAddress(options.sender)} renew ${event.name} cost ${amount} ${
            Tokens.ethereum.NativeCoin.symbol
          } expired date ${new Date(expired * 1000).toISOString()} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
