import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  DepositEther: '0x819557bb6c528588eb5c050cf4dd54b96956b6f93a5232c6b429d19e95fe8e89',
  WithdrawEther: '0x7af7d9e5b71152303ff7a5221e1a22febc3cf6407ea2a05f870d770097177db0',
  Mint: '0x2f00e3cdd69a77be7ed215ec7b2a36784dd158f921fca79ac29deffa353fe6ee',
  Burn: '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2',
  LiquidationRecord: '0xb59dc9737d55b75fc6ca7522e82d6161da5d7c8337b9ab990a5846f95b5ccdad',
};

export class LybraAdapter extends Adapter {
  public readonly name: string = 'adapter.lybra';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.DepositEther]: EventSignatureMapping[Signatures.DepositEther],
      [Signatures.WithdrawEther]: EventSignatureMapping[Signatures.WithdrawEther],
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Burn]: EventSignatureMapping[Signatures.Burn],
      [Signatures.LiquidationRecord]: EventSignatureMapping[Signatures.LiquidationRecord],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const signature = topics[0];

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      if (signature !== Signatures.LiquidationRecord) {
        const sponsor = normalizeAddress(event.sponsor);
        const onBehalfOf = normalizeAddress(event.onBehalfOf);
        const amount = new BigNumber(event.amount.toString()).dividedBy(1e18).toString(10);

        let action: KnownAction = 'deposit';
        if (signature === Signatures.WithdrawEther) {
          action = 'withdraw';
        }
        if (signature === Signatures.Mint) {
          action = 'borrow';
        }
        if (signature === Signatures.Burn) {
          action = 'repay';
        }

        let token: Token = Tokens.ethereum.ETH;
        if (signature === Signatures.Mint || signature === Signatures.Burn) {
          token = Tokens.ethereum.eUSD;
        }

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [sponsor, onBehalfOf],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${sponsor} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      } else if (signature === Signatures.Mint || signature === Signatures.Burn) {
      }
    }

    return null;
  }
}
