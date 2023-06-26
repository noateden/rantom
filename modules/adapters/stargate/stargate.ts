import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { LayerZeroChainIdMaps } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Mint: '0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb',
  Burn: '0x49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a',
  Swap: '0x34660fc8af304464529f48a778e03d03e4d34bcd5f9b6f0cfbf3cd238c642f7f',
  SwapRemote: '0xfb2b592367452f1c437675bed47f5e1e6c25188c17d7ba01a12eb030bc41ccef',
};

export class StargateAdapter extends Adapter {
  public readonly name: string = 'adapter.stargate';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.Swap]: EventSignatureMapping[Signatures.Swap],
      [Signatures.SwapRemote]: EventSignatureMapping[Signatures.SwapRemote],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      let token: Token | null = null;
      for (const pool of this.config.staticData.pools) {
        if (compareAddress(address, pool.address)) {
          token = pool.token;
        }
      }

      if (token) {
        const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
        const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

        if (signature === Signatures.Mint || signature === Signatures.Burn || signature === Signatures.SwapRemote) {
          const amount = new BigNumber(event.amountSD).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          const provider = event.to ? normalizeAddress(event.to) : normalizeAddress(event.from);
          const action: KnownAction = signature === Signatures.Mint ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [provider],
            readableString: `${provider} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              fromChain: chain,
              toChain: LayerZeroChainIdMaps[Number(event.chainId)].toString(),
            },
          };
        } else if (signature === Signatures.Swap) {
          const amount = new BigNumber(event.amountSD).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          const provider = normalizeAddress(event.from);
          const chainId = Number(event.chainId);
          let targetChain = 'unknown';
          for (const [chain, id] of Object.entries(this.config.staticData.chainIds)) {
            if (id === chainId) {
              targetChain = chain;
            }
          }

          return {
            protocol: this.config.protocol,
            action: 'bridge',
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [provider],
            readableString: `${provider} bridge ${amount} ${token.symbol} from ${chain} to ${targetChain} on ${this.config.protocol}`,
            addition: {
              fromChain: chain,
              toChain: targetChain,
            },
          };
        }
      }
    }

    return null;
  }
}
