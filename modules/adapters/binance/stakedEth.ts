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
  DepositEth: '0xe32c4b34261b430739ef30d727d062f9fdd6410be2080e6fd875a6015f40de83',
};

export class BinanceStakedAdapter extends Adapter {
  public readonly name: string = 'adapter.binance-staked-eth';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.DepositEth]: EventSignatureMapping[Signatures.DepositEth],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const user = normalizeAddress(event.user);
      const amount = new BigNumber(event.ethAmount).dividedBy(1e18).toString(10);

      return {
        protocol: this.config.protocol,
        action: 'deposit',
        addresses: [user],
        tokens: [Tokens.ethereum.ETH],
        tokenAmounts: [amount],
        readableString: `${user} deposit ${amount} ETH on ${this.config.protocol} chain ${chain}`,
      };
    }

    return null;
  }
}
