import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import cErc20Abi from '../../../configs/abi/compound/cErc20.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Mint: '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  Redeem: '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929',
  Borrow: '0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80',
  Repay: '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1',
  Liquidate: '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52',
};

export class CompoundAdapter extends Adapter {
  public readonly name: string = 'adapter.compound';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Mint]: EventSignatureMapping[Signatures.Mint],
      [Signatures.Redeem]: EventSignatureMapping[Signatures.Redeem],
      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain].indexOf(address) !== -1 &&
      (EventSignatureMapping[signature] ||
        (this.config.customEventMapping && this.config.customEventMapping[signature]))
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      let event;
      if (this.config.customEventMapping && this.config.customEventMapping[signature]) {
        event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
      } else {
        event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));
      }

      const poolContract = new web3.eth.Contract(cErc20Abi as any, address);
      let token: Token | null;
      try {
        const underlyingAddr = await poolContract.methods.underlying().call();
        token = await this.getWeb3Helper().getErc20Metadata(chain, underlyingAddr);
      } catch (e: any) {
        token = Tokens[chain].NativeCoin;
      }

      if (token) {
        switch (signature) {
          case Signatures.Mint:
          case Signatures.Redeem: {
            const user = normalizeAddress(event[0]);
            const amount = new BigNumber(event[1].toString())
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);

            return {
              protocol: this.config.protocol,
              action: signature === Signatures.Mint ? 'supply' : 'withdraw',
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${user} ${signature === Signatures.Mint ? 'supply' : 'withdraw'} ${amount} ${
                token.symbol
              } on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
