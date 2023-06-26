import Web3 from 'web3';

import InstadappAccountV2Abi from '../../../configs/abi/instadapp/InstaAccountV2.json';
import { InstadappAccountV2ImplementationContract } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseContractInfoOptions, AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  LogCast: '0xf6d9b29bbf2ae698de33670961ec53f895af65801d2cdaced431cc6129865347',
};

export class InstadappAdapter extends Adapter {
  public readonly name: string = 'adapter.instadapp';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.LogCast]: { abi: [] },
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics } = options;

    const signature = topics[0];
    if (signature === Signatures.LogCast) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const contract = new web3.eth.Contract(InstadappAccountV2Abi as any, address);
      try {
        const implementations = await contract.methods.implementations().call();
        if (
          this.config.contracts[chain] &&
          this.config.contracts[chain].indexOf(normalizeAddress(implementations)) !== -1
        ) {
          const sender = await this.getSenderAddress(options);

          return {
            protocol: this.config.protocol,
            action: 'useContract',
            addresses: [sender],
            tokens: [],
            tokenAmounts: [],
            readableString: `${sender} use contract on ${this.config.protocol} chain ${chain}`,
          };
        }
      } catch (e: any) {}
    }

    return null;
  }

  public async tryParsingContractInfo(options: AdapterParseContractInfoOptions): Promise<string | null> {
    const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
    const contract = new web3.eth.Contract(InstadappAccountV2Abi as any, options.address);
    try {
      const implementations = await contract.methods.implementations().call();
      if (compareAddress(implementations, InstadappAccountV2ImplementationContract)) {
        return `Instadapp Account ${normalizeAddress(options.address).slice(0, 6)}`;
      }
    } catch (e: any) {}

    return null;
  }
}
