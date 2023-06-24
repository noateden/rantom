import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  OrderHistory: '0x92ceb067a9883c85aba061e46b9edf505a0d6e81927c4b966ebed543a5221787',
  DODOSwap: '0xc2c0245e056d5fb095f04cd6373bc770802ebd1e6c918eb78fdef843cdb37b0f',
};

export class DodoAdapter extends Adapter {
  public readonly name: string = 'adapter.dodo';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.OrderHistory]: EventSignatureMapping[Signatures.OrderHistory],
      [Signatures.DODOSwap]: EventSignatureMapping[Signatures.DODOSwap],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
      const token0 = await this.getWeb3Helper().getErc20Metadata(chain, event.fromToken);
      const token1 = await this.getWeb3Helper().getErc20Metadata(chain, event.toToken);

      if (token0 && token1) {
        const amount0 = new BigNumber(event.fromAmount).dividedBy(new BigNumber(10).pow(token0.decimals)).toString(10);
        const amount1 = new BigNumber(event.returnAmount)
          .dividedBy(new BigNumber(10).pow(token1.decimals))
          .toString(10);

        let addresses: Array<string> = [];
        if (signature === Signatures.OrderHistory) {
          addresses = [normalizeAddress(event.sender)];
        } else {
          addresses = [normalizeAddress(event.trader), normalizeAddress(event.receiver)];
        }

        return {
          protocol: this.config.protocol,
          action: 'trade',
          addresses: addresses,
          tokens: [token0, token1],
          tokenAmounts: [amount0, amount1],
          readableString: `${addresses[0]} trade ${amount0} ${token0.symbol} for ${amount1} ${token1.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
