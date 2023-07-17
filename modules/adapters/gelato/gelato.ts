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
  LogExecSuccess: '0x66c4011e59db1d425e14edc51069e4f5ec3d042d2a254511a8dbc6e3996c9140',
};

export class GelatoAdapter extends Adapter {
  public readonly name: string = 'adapter.gelato';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.LogExecSuccess]: EventSignatureMapping[Signatures.LogExecSuccess],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const executor = normalizeAddress(event.executor);
      const service = normalizeAddress(event.service);

      const token = await this.getWeb3Helper().getErc20Metadata(chain, event.creditToken);
      if (token) {
        const amount = new BigNumber(event.credit.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        return {
          protocol: this.config.protocol,
          action: 'executeTask',
          addresses: [executor, service],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${executor} execute task on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
