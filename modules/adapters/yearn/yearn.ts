import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import YearnVaultAbi from '../../../configs/abi/yearn/YearnVault-0.3.3.json';
import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  ModifyLock: '0x01affbd18fb24fa23763acc978a6bb9b9cd159b1cc733a15f3ea571d691cabc1',
  Withdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
};

export class YearnAdapter extends Adapter {
  public readonly name: string = 'adapter.yearn';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
      [Signatures.ModifyLock]: EventSignatureMapping[Signatures.ModifyLock],
      [Signatures.Withdraw]: config.customEventMapping
        ? config.customEventMapping[Signatures.Withdraw]
        : EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (signature === Signatures.ModifyLock || signature === Signatures.Withdraw) {
      if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
        const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        const provider = normalizeAddress(event.user);
        const token = Tokens.ethereum.YFI;
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
        const action: KnownAction = signature === Signatures.ModifyLock ? 'lock' : 'unlock';

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [provider],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${provider} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          addition:
            signature === Signatures.ModifyLock
              ? {
                  lockUntil: Number(event.locktime),
                }
              : undefined,
        };
      }
    } else if (signature === Signatures.Transfer) {
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
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
        const token = vaultConfig.token;

        if (compareAddress(event.from, AddressZero) || compareAddress(event.to, AddressZero)) {
          const rpcWrapper = this.getRpcWrapper();
          let blockNumber: number = options.blockNumber ? options.blockNumber : 0;
          if (blockNumber === 0) {
            const tx = await web3.eth.getTransactionReceipt(options.hash as string);
            blockNumber = tx.blockNumber;
          }
          const pricePerShare = new BigNumber(
            (
              await rpcWrapper.queryContract({
                chain,
                abi: YearnVaultAbi,
                contract: address,
                method: 'pricePerShare',
                params: [],
                blockNumber,
              })
            ).toString()
          );
          const amount = new BigNumber(event.value)
            .multipliedBy(pricePerShare)
            .dividedBy(new BigNumber(10).pow(token.decimals * 2))
            .toString(10);
          const account = compareAddress(event.from, AddressZero)
            ? normalizeAddress(event.to)
            : normalizeAddress(event.from);
          const action: KnownAction = compareAddress(event.from, AddressZero) ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [account],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${account} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
