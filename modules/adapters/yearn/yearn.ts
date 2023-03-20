import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import VaultAbi from '../../../configs/abi/yearn/YearnVault-0.3.3.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { multicallv2 } from '../../../lib/multicall';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions, MulticallCall } from '../../../types/options';
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

    try {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const calls: Array<MulticallCall> = [
        {
          name: 'governance',
          address: address,
          params: [],
        },
        {
          name: 'token',
          address: address,
        },
      ];
      const result = await multicallv2(chain, VaultAbi, calls);
      const governance = normalizeAddress(result[0][0]);
      if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(governance)) !== -1) {
        let token = null;

        if (vaultConfig) {
          token = vaultConfig.token;
        } else {
          token = await this.getWeb3Helper().getErc20Metadata(chain, result[1][0]);
        }

        if (token) {
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
      }
    } catch (e: any) {
      // ignore bad vault
      console.info(e);
    }

    return null;
  }
}
