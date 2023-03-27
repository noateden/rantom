import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { AbracadabraCauldron } from './helper';

const Signatures = {
  LogAddCollateral: '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87',
  LogRemoveCollateral: '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402',
  LogBorrow: '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24',
  LogRepay: '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e',
  LogLiquidation: '0x66b108dc29b952efc76dccea9b82dce6b59fab4d9af73d8dcc9789afcad5daf6',
};

export class AbracadabraAdapter extends Adapter {
  public readonly name: string = 'adapter.abracadabra';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.LogAddCollateral]: EventSignatureMapping[Signatures.LogAddCollateral],
      [Signatures.LogRemoveCollateral]: EventSignatureMapping[Signatures.LogRemoveCollateral],
      [Signatures.LogBorrow]: EventSignatureMapping[Signatures.LogBorrow],
      [Signatures.LogRepay]: EventSignatureMapping[Signatures.LogRepay],
      [Signatures.LogLiquidation]: EventSignatureMapping[Signatures.LogLiquidation],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (EventSignatureMapping[signature]) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      let cauldronInfo: AbracadabraCauldron | null = null;
      if (this.config.staticData && this.config.staticData.cauldrons) {
        for (const cauldron of this.config.staticData.cauldrons) {
          if (compareAddress(cauldron.address, address)) {
            cauldronInfo = cauldron;
          }
        }
      }

      if (cauldronInfo) {
        if (signature === Signatures.LogAddCollateral || signature === Signatures.LogRemoveCollateral) {
          const action: KnownAction = signature === Signatures.LogAddCollateral ? 'deposit' : 'withdraw';
          const from = normalizeAddress(event.from);
          const to = normalizeAddress(event.to);
          const amount = new BigNumber(event.share)
            .dividedBy(new BigNumber(10).pow(cauldronInfo.token.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [from, to],
            tokens: [cauldronInfo.token],
            tokenAmounts: [amount],
            readableString: `${from} ${action} ${amount} ${cauldronInfo.token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.LogBorrow || signature === Signatures.LogRepay) {
          const action: KnownAction = signature === Signatures.LogBorrow ? 'borrow' : 'repay';
          const from = normalizeAddress(event.from);
          const to = normalizeAddress(event.to);
          const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [from, to],
            tokens: [this.config.staticData.magicInternetMoney],
            tokenAmounts: [amount],
            readableString: `${from} ${action} ${amount} ${this.config.staticData.magicInternetMoney.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.LogLiquidation) {
          const from = normalizeAddress(event.from);
          const user = normalizeAddress(event.user);
          const amount = new BigNumber(event.collateralShare)
            .dividedBy(new BigNumber(10).pow(cauldronInfo.token.decimals))
            .toString(10);
          const debtAmount = new BigNumber(event.borrowAmount).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: 'liquidate',
            addresses: [from, user],
            tokens: [cauldronInfo.token],
            tokenAmounts: [amount],
            readableString: `${from} liquidate ${amount} ${cauldronInfo.token.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              debtToken: this.config.staticData.magicInternetMoney,
              debtAmount: debtAmount,
            },
          };
        }
      }
    }

    return null;
  }
}
