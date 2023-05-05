import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
  Withdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
};

export class YearnAdapter extends Adapter {
  public readonly name: string = 'adapter.yearn';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];

    let vaultConfig = null;
    if (this.config.staticData && this.config.staticData.vaults) {
      for (const vault of this.config.staticData.vaults) {
        if (vault.chain === chain && compareAddress(vault.address, address)) {
          vaultConfig = vault;
        }
      }
    }

    if (!vaultConfig) return null;

    if (vaultConfig) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const token = vaultConfig.token;

      // yearn vault
      let event;
      if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
        event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
      } else {
        event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      }
      const user = normalizeAddress(event.recipient);
      const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
      return {
        protocol: this.config.protocol,
        action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
        addresses: [user],
        tokens: [token],
        tokenAmounts: [amount],
        readableString: `${user} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
          token.symbol
        } on ${this.config.protocol} chain ${chain}`,
      };
    }

    return null;
  }
}
