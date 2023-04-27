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
import { ArrakisVaultInfo } from './helper';

const Signatures = {
  // v1 vault
  Minted: '0x55801cfe493000b734571da1694b21e7f66b11e8ce9fdaa0524ecb59105e73e7',
  Burned: '0x7239dff1718b550db7f36cbf69c665cfeb56d0e96b4fb76a5cba712961b65509',

  // v2 vault
  LogMint: '0x5f11830295067c4bcc7d02d4e3b048cd7427be50a3aeb6afc9d3d559ee64bcfa',
  LogBurn: '0x86dacd5ce62967ebd3d915a82b22ad7e159538e50c7ba451e073fec048d9f127',
};

export class ArrakisAdapter extends Adapter {
  public readonly name: string = 'adapter.arrakis';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Minted]: EventSignatureMapping[Signatures.Minted],
      [Signatures.Burned]: EventSignatureMapping[Signatures.Burned],
      [Signatures.LogMint]: EventSignatureMapping[Signatures.LogMint],
      [Signatures.LogBurn]: EventSignatureMapping[Signatures.LogBurn],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let vaultInfo: ArrakisVaultInfo | null = null;
      if (this.config.staticData) {
        for (const vault of this.config.staticData.vaults) {
          if (compareAddress(vault.address, address)) {
            vaultInfo = vault;
          }
        }
      }

      if (vaultInfo) {
        const user = normalizeAddress(event.receiver);

        if (signature === Signatures.Minted || signature === Signatures.LogMint) {
          const amount0 = new BigNumber(event.amount0In.toString())
            .dividedBy(new BigNumber(10).pow(vaultInfo.token0.decimals))
            .toString(10);
          const amount1 = new BigNumber(event.amount1In.toString())
            .dividedBy(new BigNumber(10).pow(vaultInfo.token1.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'deposit',
            addresses: [user],
            tokens: [vaultInfo.token0, vaultInfo.token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${user} deposit ${amount0} ${vaultInfo.token0.symbol} and ${amount1} ${vaultInfo.token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.Burned || signature === Signatures.LogBurn) {
          const amount0 = new BigNumber(event.amount0Out.toString())
            .dividedBy(new BigNumber(10).pow(vaultInfo.token0.decimals))
            .toString(10);
          const amount1 = new BigNumber(event.amount1Out.toString())
            .dividedBy(new BigNumber(10).pow(vaultInfo.token1.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: 'withdraw',
            addresses: [user],
            tokens: [vaultInfo.token0, vaultInfo.token1],
            tokenAmounts: [amount0, amount1],
            readableString: `${user} withdraw ${amount0} ${vaultInfo.token0.symbol} and ${amount1} ${vaultInfo.token1.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
