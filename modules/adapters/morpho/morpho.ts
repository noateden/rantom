import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Supplied: '0x11adb3570ba55fd255b1f04252ca0071ae6639c86d4fd69e7c1bf1688afb493f',
  Withdrawn: '0x378f9d375cd79e36c19c26a9e57791fe7cd5953b61986c01ebf980c0efb92801',
  Borrowed: '0xc1cba78646fef030830d099fc25cb498953709c9d47d883848f81fd207174c9f',
  Repaid: '0x7b417e520d2b905fc5a1689d29d329358dd55efc60ed115aa165b0a2b64232c6',
  Liquidated: '0xc2c75a73164c2efcbb9f74bfa511cd0866489d90687831a7217b3dbeeb697088',
};

export class MorphoAdapter extends Adapter {
  public readonly name: string = 'adapter.morpho';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Supplied]: EventSignatureMapping[Signatures.Supplied],
      [Signatures.Withdrawn]: EventSignatureMapping[Signatures.Withdrawn],
      [Signatures.Borrowed]: EventSignatureMapping[Signatures.Borrowed],
      [Signatures.Repaid]: EventSignatureMapping[Signatures.Repaid],
      [Signatures.Liquidated]: EventSignatureMapping[Signatures.Liquidated],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const poolToken: Token | null = await this.getWeb3Helper().getErc20Metadata(
        chain,
        event._poolToken ? event._poolToken : event._poolTokenCollateral
      );

      let token: Token | null = null;
      if (this.config.staticData && poolToken) {
        for (const market of this.config.staticData.markets) {
          if (
            market.chain === chain &&
            compareAddress(market.address, address) &&
            compareAddress(market.market, poolToken.address)
          ) {
            token = market.token;
          }
        }
      }

      if (token) {
        let action: KnownAction = 'deposit';
        let addresses: Array<string> = [];
        let amount = '0';

        switch (signature) {
          case Signatures.Supplied: {
            addresses = [normalizeAddress(event._from), normalizeAddress(event._onBehalf)];
            amount = new BigNumber(event._amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            break;
          }
          case Signatures.Withdrawn: {
            action = 'withdraw';
            addresses = [normalizeAddress(event._supplier), normalizeAddress(event._receiver)];
            amount = new BigNumber(event._amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            break;
          }
          case Signatures.Borrowed: {
            action = 'borrow';
            addresses = [normalizeAddress(event._borrower)];
            amount = new BigNumber(event._amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            break;
          }
          case Signatures.Repaid: {
            action = 'repay';
            addresses = [normalizeAddress(event._repayer), normalizeAddress(event._onBehalf)];
            amount = new BigNumber(event._amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            break;
          }
          case Signatures.Liquidated: {
            action = 'liquidate';
            addresses = [normalizeAddress(event._liquidator), normalizeAddress(event._liquidated)];
            amount = new BigNumber(event._amountSeized).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
            break;
          }
        }

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: addresses,
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${addresses[0]} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
