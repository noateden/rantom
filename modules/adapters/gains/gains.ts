import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { GainsMappings } from './abis';

const Signatures = {
  MarketExecuted: '0x2739a12dffae5d66bd9e126a286078ed771840f2288f0afa5709ce38c3330997',
};

export class GainsAdapter extends Adapter {
  public readonly name: string = 'adapter.gains';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.MarketExecuted]: GainsMappings[Signatures.MarketExecuted],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event: any = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.MarketExecuted) {
        const trader = normalizeAddress(event.t.trader);
        const collateralDai = new BigNumber(event.t.positionSizeDai.toString());
        const sizeInDai = collateralDai.multipliedBy(Number(event.t.leverage)).dividedBy(1e18).toString(10);
        const pairIndex = Number(event.t.pairIndex);
        if (pairIndex < this.config.staticData.pairsIndex[chain].length) {
          const token = this.config.staticData.pairsIndex[chain][pairIndex].token;
          const isLong = Boolean(event.t.buy);
          const isOpen = Boolean(event.open);

          let action: KnownAction;
          if (isOpen) {
            action = isLong ? 'increaseLong' : 'increaseShort';
          } else {
            action = isLong ? 'decreaseLong' : 'decreaseShort';
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [trader],
            tokens: [token, Tokens.arbitrum.DAI],
            tokenAmounts: [],
            usdAmounts: [sizeInDai, collateralDai.dividedBy(1e18).toString(10)],
            readableString: `${trader} ${action} ${token.symbol} size $${sizeInDai} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
