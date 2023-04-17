import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import OffchainAggregatorAbi from '../../../configs/abi/chainlink/OffchainAggregator.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  NewTransmission: '0xf6a97944f31ea060dfde0566e4167c1a1082551e64b60ecb14d599a9d023d451',
};

export class ChainlinkAdapter extends Adapter {
  public readonly name: string = 'adapter.chainlink';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.NewTransmission]: EventSignatureMapping[Signatures.NewTransmission],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && EventSignatureMapping[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      try {
        const LINK = await rpcWrapper.queryContract({
          chain,
          abi: OffchainAggregatorAbi,
          contract: address,
          method: 'LINK',
          params: [],
        });
        const description = await rpcWrapper.queryContract({
          chain,
          abi: OffchainAggregatorAbi,
          contract: address,
          method: 'description',
          params: [],
        });
        const decimals = await rpcWrapper.queryContract({
          chain,
          abi: OffchainAggregatorAbi,
          contract: address,
          method: 'decimals',
          params: [],
        });

        // const results = await multicallv2(chain, OffchainAggregatorAbi, calls);
        if (compareAddress(LINK.toString(), Tokens.ethereum.LINK.address)) {
          // chainlink price
          const label = description.toString();
          const answer = new BigNumber(event.answer)
            .dividedBy(new BigNumber(10).pow(new BigNumber(decimals)))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'update',
            tokens: [],
            tokenAmounts: [],
            addresses: [normalizeAddress(options.sender)],
            readableString: `${normalizeAddress(options.sender)} update ${label} price to ${answer} on ${
              this.config.protocol
            } chain ${options.chain}`,
            addition: {
              label: label,
              answer: answer,
            },
          };
        }
      } catch (e: any) {
        // ignore bad data
      }
    }

    return null;
  }
}
