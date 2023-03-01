import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import CometAbi from '../../../configs/abi/compound/Comet.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  SupplyV3: '0xd1cf3d156d5f8f0d50f6c122ed609cec09d35c9b9fb3fff6ea0959134dae424e',
  WithdrawV3: '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb',
  SupplyCollateralV3: '0xfa56f7b24f17183d81894d3ac2ee654e3c26388d17a28dbd9549b8114304e1f4',
  WithdrawCollateralV3: '0xd6d480d5b3068db003533b170d67561494d72e3bf9fa40a266471351ebba9e16',
};

export class Compoundv3Adapter extends Adapter {
  public readonly name: string = 'adapter.compound3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.SupplyV3]: EventSignatureMapping[Signatures.SupplyV3],
      [Signatures.WithdrawV3]: EventSignatureMapping[Signatures.WithdrawV3],
      [Signatures.SupplyCollateralV3]: EventSignatureMapping[Signatures.SupplyCollateralV3],
      [Signatures.WithdrawCollateralV3]: EventSignatureMapping[Signatures.WithdrawCollateralV3],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== -1 && EventSignatureMapping[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      // v3 processing
      const poolContract = new web3.eth.Contract(CometAbi as any, address);

      let token = null;
      let action: KnownAction = 'deposit';
      switch (signature) {
        case Signatures.SupplyV3:
        case Signatures.WithdrawV3: {
          const baseTokenAddr = await poolContract.methods.baseToken().call();
          token = await this.getWeb3Helper().getErc20Metadata(chain, baseTokenAddr);
          action = signature === Signatures.SupplyV3 ? 'deposit' : 'withdraw';
          break;
        }
        case Signatures.SupplyCollateralV3:
        case Signatures.WithdrawCollateralV3: {
          token = await this.getWeb3Helper().getErc20Metadata(chain, event.asset);
          action = signature === Signatures.SupplyCollateralV3 ? 'deposit' : 'withdraw';
          break;
        }
      }

      if (token) {
        const user = event.from ? normalizeAddress(event.from) : normalizeAddress(event.src);
        const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

        return {
          protocol: this.config.protocol,
          action: action as KnownAction,
          addresses: [user],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
