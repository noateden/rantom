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

  // new signatures from Aave v3 optimizer
  CollateralSupplied: '0x4d1fc6dc36972a1eeab2351fae829d06c827d7ee429880dbf762ec00b805fb2f',
  CollateralWithdrawn: '0xb49f4cffa4b6674963440a1fb6cb419c233a9341280f44d8543571eca1306577',
  AaveV3Borrowed: '0xf99275e3db7a3400181f0bd088002bba02b833be9187bccc88fbbc79fb52f2f1',
  AaveV3Withdrawn: '0x6a9c828ef646db99cc7a20bbfb02fdf8f7dcc183400a28daab4968e47b9a21e0',
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
      [Signatures.CollateralSupplied]: EventSignatureMapping[Signatures.CollateralSupplied],
      [Signatures.CollateralWithdrawn]: EventSignatureMapping[Signatures.CollateralWithdrawn],
      [Signatures.AaveV3Borrowed]: EventSignatureMapping[Signatures.AaveV3Borrowed],
      [Signatures.AaveV3Withdrawn]: EventSignatureMapping[Signatures.AaveV3Withdrawn],
    });
  }

  private async parseV1Event(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
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

  private async parseV2Event(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, topics, data } = options;

    const signature = topics[0];

    const web3 = new Web3();
    let event;
    if (
      this.config.customEventMapping &&
      (signature === Signatures.Supplied || signature === Signatures.Repaid || signature === Signatures.Liquidated)
    ) {
      event = web3.eth.abi.decodeLog(this.config.customEventMapping[signature].abi, data, topics.slice(1));
    } else {
      event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
    }

    const token: Token | null = await this.getWeb3Helper().getErc20Metadata(
      chain,
      event.underlying ? event.underlying : event.underlyingCollateral
    );
    if (token) {
      let action: KnownAction = 'deposit';
      let addresses: Array<string> = [];
      let amount = '0';

      switch (signature) {
        case Signatures.Supplied:
        case Signatures.CollateralSupplied: {
          addresses = [normalizeAddress(event.from), normalizeAddress(event.onBehalf)];
          amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          break;
        }
        case Signatures.AaveV3Withdrawn:
        case Signatures.CollateralWithdrawn: {
          action = 'withdraw';
          addresses = [
            normalizeAddress(event.caller),
            normalizeAddress(event.onBehalf),
            normalizeAddress(event.receiver),
          ];
          amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          break;
        }
        case Signatures.AaveV3Borrowed: {
          action = 'borrow';
          addresses = [
            normalizeAddress(event.caller),
            normalizeAddress(event.onBehalf),
            normalizeAddress(event.receiver),
          ];
          amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          break;
        }
        case Signatures.Repaid: {
          action = 'repay';
          addresses = [normalizeAddress(event.repayer), normalizeAddress(event.onBehalf)];
          amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
          break;
        }
        case Signatures.Liquidated: {
          action = 'liquidate';
          addresses = [normalizeAddress(event.liquidator), normalizeAddress(event.borrower)];
          amount = new BigNumber(event.amountSeized).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
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
    } else {
      console.log(event);
    }

    return null;
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { address } = options;

    if (
      compareAddress(address, '0x777777c9898d384f785ee44acfe945efdff5f3e0') ||
      compareAddress(address, '0x8888882f8f843896699869179fb6e4f7e3b58888')
    ) {
      return await this.parseV1Event(options);
    } else if (compareAddress(address, '0x33333aea097c193e66081e930c33020272b33333')) {
      return await this.parseV2Event(options);
    }

    return null;
  }
}
