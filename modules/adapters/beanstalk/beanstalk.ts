import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  AddDeposit: '0xdbe49eaf5c2a8a7f65920c200ca5d47395540b884f6a1886fdb2611624f9981b',
  AddWithdrawal: '0xad946216d2715ed9b769178b59b5bd1b1ee3a1ef3adbe82f17d30617109e96f3',
};

export class BeanstalkAdapter extends Adapter {
  public readonly name: string = 'adapter.lido';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.AddDeposit]: EventSignatureMapping[Signatures.AddDeposit],
      [Signatures.AddWithdrawal]: EventSignatureMapping[Signatures.AddWithdrawal],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 && this.eventMappings[signature]) {
      if (signature === Signatures.AddDeposit || signature === Signatures.AddWithdrawal) {
        const web3 = new Web3();
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

        const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
        if (token) {
          const account = normalizeAddress(event.account);
          const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

          return {
            protocol: this.config.protocol,
            action: signature === Signatures.AddDeposit ? 'deposit' : 'withdraw',
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [account],
            readableString: `${account} ${signature === Signatures.AddDeposit ? 'deposit' : 'withdraw'} ${amount} ${
              token.symbol
            } on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      }
    }

    return null;
  }
}
