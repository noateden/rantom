import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  GemJoin: '0xef693bed00000000000000000000000000000000000000000000000000000000',
  GemExit: '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
};

export class MakerAdapter extends Adapter {
  public readonly name: string = 'adapter.maker';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.GemJoin]: { abi: [] },
      [Signatures.GemExit]: { abi: [] },
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3();

      if (compareAddress(address, this.config.staticData.daiJoin)) {
        const borrower = normalizeAddress(web3.eth.abi.decodeParameter('address', topics[1]).toString());
        const amount = new BigNumber(web3.eth.abi.decodeParameter('uint256', topics[3]).toString())
          .dividedBy(new BigNumber(10).pow(Tokens.ethereum.DAI.decimals))
          .toString(10);

        const action: KnownAction = signature === Signatures.GemJoin ? 'borrow' : 'repay';

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [borrower],
          tokens: [Tokens.ethereum.DAI],
          tokenAmounts: [amount],
          readableString: `${borrower} ${action} ${amount} ${Tokens.ethereum.DAI.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      } else {
        let token: Token | null = null;
        for (const gem of this.config.staticData.gems) {
          if (compareAddress(address, gem.address)) {
            token = gem.token;
          }
        }

        if (token) {
          const depositor = normalizeAddress(web3.eth.abi.decodeParameter('address', topics[1]).toString());
          const amount = new BigNumber(web3.eth.abi.decodeParameter('uint256', topics[3]).toString())
            .dividedBy(new BigNumber(10).pow(token.decimals))
            .toString(10);

          const action: KnownAction = signature === Signatures.GemExit ? 'deposit' : 'withdraw';

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [depositor],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${depositor} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
