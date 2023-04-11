import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import cErc20Abi from '../../../configs/abi/compound/cErc20.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { CompoundAdapter } from '../compound/compound';

const Signatures = {
  Flashloan: '0x33c8e097c526683cbdb29adf782fac95e9d0fbe0ed635c13d8c75fdf726557d9',
};

export class IronbankAdapter extends CompoundAdapter {
  public readonly name: string = 'adapter.ironbank';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);

    this.eventMappings[Signatures.Flashloan] = EventSignatureMapping[Signatures.Flashloan];
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const action: TransactionAction | null = await super.tryParsingActions(options);

    if (action) {
      return action;
    }

    // expect flashloan transaction
    const { chain, address, topics, data } = options;
    const signature = topics[0];
    if (
      this.config.contracts[chain].indexOf(address) !== -1 &&
      EventSignatureMapping[signature] &&
      signature === Signatures.Flashloan
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const poolContract = new web3.eth.Contract(cErc20Abi as any, address);
      let token: Token | null;
      try {
        const underlyingAddr = await poolContract.methods.underlying().call();
        token = await this.getWeb3Helper().getErc20Metadata(chain, underlyingAddr);
      } catch (e: any) {
        token = Tokens[chain].NativeCoin;
      }

      if (token) {
        const receiver = normalizeAddress(event.receiver);
        const sender = await this.getSenderAddress(options);
        const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'flashloan',
          addresses: [sender, receiver],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${sender} flashloan ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
