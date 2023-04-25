import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364',
  ClaimedRewards: '0x141d6e75554381bcc1326596e8010e6c432bb0988e14ca0310d85837a211d292',
  LockedV1: '0xca8d506eda84f8ed07c2908ae102299d34888ef5e19b97f56e4d6fcd1104c31e',
  UnlockExecutedV1: '0xb291e2a2847a5ad6d47409943306c6d6e8c63a9855b849701b868191e9478970',
};

export class ConicAdapter extends Adapter {
  public readonly name: string = 'adapter.conic';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: config.customEventMapping
        ? config.customEventMapping[Signatures.Deposit]
        : EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: config.customEventMapping
        ? config.customEventMapping[Signatures.Withdraw]
        : EventSignatureMapping[Signatures.Withdraw],
      [Signatures.ClaimedRewards]: EventSignatureMapping[Signatures.ClaimedRewards],
      [Signatures.LockedV1]: EventSignatureMapping[Signatures.LockedV1],
      [Signatures.UnlockExecutedV1]: EventSignatureMapping[Signatures.UnlockExecutedV1],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Deposit || signature === Signatures.Withdraw) {
        let token: Token | null = null;
        if (this.config.staticData) {
          token = this.config.staticData.poolTokens[normalizeAddress(address)];
        }

        if (token) {
          let action: KnownAction = 'deposit';
          let sender = normalizeAddress(event.sender);

          if (signature === Signatures.Withdraw) {
            action = 'withdraw';
            sender = normalizeAddress(event.account);
          }

          const amount = event.depositedAmount
            ? new BigNumber(event.depositedAmount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10)
            : new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            tokens: [token],
            tokenAmounts: [amount],
            addresses: [sender],
            readableString: `${sender} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      } else if (signature === Signatures.ClaimedRewards) {
        const sender = await this.getSenderAddress(options);
        const claimedCrv = new BigNumber(event.claimedCrv.toString()).dividedBy(1e18).toString(10);
        const claimedCvx = new BigNumber(event.claimedCvx.toString()).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'collect',
          tokens: [Tokens.ethereum.CRV, Tokens.ethereum.CVX],
          tokenAmounts: [claimedCrv, claimedCvx],
          addresses: [sender],
          readableString: `${sender} collect ${claimedCrv} CRV and ${claimedCvx} CVX on ${this.config.protocol} chain ${options.chain}`,
        };
      } else if (signature === Signatures.LockedV1 || signature === Signatures.UnlockExecutedV1) {
        const account = normalizeAddress(event.account);
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);
        const action: KnownAction = signature === Signatures.LockedV1 ? 'deposit' : 'withdraw';

        return {
          protocol: this.config.protocol,
          action: action,
          tokens: [Tokens.ethereum.CNC],
          tokenAmounts: [amount],
          addresses: [account],
          readableString: `${account} ${action} ${amount} CNC on ${this.config.protocol} chain ${options.chain}`,
        };
      }
    }

    return null;
  }
}
