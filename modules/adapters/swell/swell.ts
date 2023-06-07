import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  ETHDepositReceived: '0xcb2ce03599937ff3d73e67e71a0f37013a6d3b697487823e37bc94da69483986',
};

export class SwellAdapter extends Adapter {
  public readonly name: string = 'adapter.swell';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.ETHDepositReceived]: EventSignatureMapping[Signatures.ETHDepositReceived],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      if (signature === Signatures.ETHDepositReceived) {
        const depositor = normalizeAddress(event.from);
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'deposit',
          addresses: [depositor],
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          readableString: `${depositor} deposit ${amount} ${Tokens.ethereum.ETH.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
