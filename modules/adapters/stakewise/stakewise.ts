import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { AddressZero, Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  Claimed: '0xc4687ac57d0a9636a21381dada24ff811c5652e7f9ee442caede1927ecebcb9b',
};

export class StakewiseAdapter extends Adapter {
  public readonly name: string = 'adapter.stakewise';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
      [Signatures.Claimed]: EventSignatureMapping[Signatures.Claimed],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Transfer) {
        const from = normalizeAddress(event.from);
        const to = normalizeAddress(event.to);
        if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
          const amount = new BigNumber(event.value).dividedBy(1e18).toString(10);
          let action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
          const user = compareAddress(from, AddressZero) ? to : from;

          return {
            protocol: this.config.protocol,
            action: action,
            tokens: [Tokens.ethereum.ETH],
            tokenAmounts: [amount],
            addresses: [user],
            readableString: `${user} ${action} ${amount} ETH on ${this.config.protocol} chain ${options.chain}`,
          };
        }
      } else if (signature === Signatures.Claimed) {
        const tokens: Array<Token> = [];
        const amounts: Array<string> = [];
        for (let i = 0; i < event.tokens.length; i++) {
          const token = await this.getWeb3Helper().getErc20Metadata(chain, event.tokens[i].toString());
          if (token) {
            tokens.push(token);
            amounts.push(
              new BigNumber(event.amounts[i].toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10)
            );
          }
        }

        if (tokens.length > 0) {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            tokens: tokens,
            tokenAmounts: amounts,
            addresses: [normalizeAddress(event.account)],
            readableString: `${normalizeAddress(event.account)} collect ${amounts[0]} ${tokens[0].symbol} on ${
              this.config.protocol
            } chain ${options.chain}`,
          };
        }
      }
    }

    return null;
  }
}
