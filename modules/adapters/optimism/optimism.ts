import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Batch: '0x602f1aeac0ca2e7a13e281a9ef0ad7838542712ce16780fa2ecffd351f05f899',
};

export class OptimismAdapter extends Adapter {
  public readonly name: string = 'adapter.optimism';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Batch]: EventSignatureMapping[Signatures.Batch],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 && EventSignatureMapping[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const sender = normalizeAddress(options.sender);
      const latestBlock = new BigNumber(event._totalElements).toString(10);

      return {
        protocol: this.config.protocol,
        action: 'batch',
        tokens: [],
        tokenAmounts: [],
        addresses: [sender],
        readableString: `${sender} batch layer-2 data block ${latestBlock} from ${this.config.protocol} to ${options.chain}`,
        addition: {
          blockNumber: latestBlock,
        },
      };
    }

    return null;
  }
}
