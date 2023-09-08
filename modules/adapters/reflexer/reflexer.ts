import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import DSProxyFactoryAbi from '../../../configs/abi/maker/DSProxyFactory.json';
import { MakerDSProxyFactoryContract, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseContractInfoOptions, AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Join: '0x0e64978d073561c3dfd4d4e3e4dce066cde2ab246a44f990fabb0a21a4a3bd95',
  Exit: '0xbc2a67d422c268da6fe45f3e7d194e1d98906d221f1cfad62a5c80f2cd209f4c',
};

const CoinJoin = '0x0a5653cca4db1b6e265f47caf6969e64f1cfdc45';
const EthJoin = '0x2d3cd7b81c93f188f3cb8ad87c8acc73d6226e3a';

export class ReflexerAdapter extends Adapter {
  public readonly name: string = 'adapter.reflexer';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Join]: EventSignatureMapping[Signatures.Join],
      [Signatures.Exit]: EventSignatureMapping[Signatures.Exit],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const user = normalizeAddress(event.usr);
      let action: KnownAction = 'deposit';
      if (compareAddress(address, EthJoin)) {
        action = signature === Signatures.Join ? 'deposit' : 'withdraw';
      } else if (compareAddress(address, CoinJoin)) {
        action = signature === Signatures.Join ? 'repay' : 'borrow';
      }

      const token: Token = compareAddress(address, EthJoin) ? Tokens.ethereum.ETH : Tokens.ethereum.RAI;
      const amount = new BigNumber(event.wad.toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

      return {
        protocol: this.config.protocol,
        action: action,
        addresses: [user],
        tokens: [token],
        tokenAmounts: [amount],
        readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
      };
    }

    return null;
  }

  public async tryParsingContractInfo(options: AdapterParseContractInfoOptions): Promise<string | null> {
    // the original DSProxy contract was deployed: 0x2b9b8b83c09e1d2bd3dace1c3db2fec8ff54a8ac
    const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
    const contract = new web3.eth.Contract(DSProxyFactoryAbi as any, MakerDSProxyFactoryContract);
    try {
      const isDsProxy = await contract.methods.isProxy(options.address).call();
      if (isDsProxy) {
        return `DSProxy ${normalizeAddress(options.address).slice(0, 6)}`;
      }
    } catch (e: any) {}

    return null;
  }
}
