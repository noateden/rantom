import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import AnyErc20Abi from '../../../configs/abi/multichain/AnyERC20.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  SwapIn: '0xaac9ce45fe3adf5143598c4f18a369591a20a3384aedaf1b525d29127e1fcd55',
  SwapOut: '0x97116cf6cd4f6412bb47914d6db18da9e16ab2142f543b86e207c24fbd16b23a',
};

export class MultichainAdapter extends Adapter {
  public readonly name: string = 'adapter.multichain';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.SwapIn]: EventSignatureMapping[Signatures.SwapIn],
      [Signatures.SwapOut]: EventSignatureMapping[Signatures.SwapOut],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 && this.eventMappings[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      let token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);
      const tokenContract = new web3.eth.Contract(AnyErc20Abi as any, event.token);
      try {
        const underlying = await tokenContract.methods.underlying().call();
        token = await this.getWeb3Helper().getErc20Metadata(chain, underlying);
      } catch (e: any) {}

      if (token) {
        const recipient = normalizeAddress(event.to);
        const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
        const fromChain = event.fromChainID.toString();
        const toChain = event.toChainID.toString();

        return {
          protocol: this.config.protocol,
          action: 'bridge',
          tokens: [token],
          tokenAmounts: [amount],
          addresses: [recipient],
          readableString: `${recipient} bridge ${amount} ${token.symbol} from ${fromChain} to ${toChain} on ${this.config.protocol}`,
          addition: {
            fromChain: fromChain,
            toChain: toChain,
          },
        };
      }
    }

    return null;
  }
}
