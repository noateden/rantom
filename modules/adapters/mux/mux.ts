import BigNumber from 'bignumber.js';

import { MuxConfig } from '../../../configs/protocols/mux';
import { normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { MuxAbiMappings, MuxEventSignatures } from './abis';

export default class MuxAdapter extends Adapter {
  public readonly name: string = 'adapter.mux';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = MuxAbiMappings;
  }

  protected getToken(chain: string, assetId: number): Token | null {
    for (const asset of (this.config as MuxConfig).assets) {
      if (chain === asset.chain && asset.assetId === assetId) {
        return asset.token;
      }
    }
    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];

      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case MuxEventSignatures.OpenPosition:
        case MuxEventSignatures.ClosePosition:
        case MuxEventSignatures.Liquidate: {
          const args = event.args as any;

          const indexToken = this.getToken(options.chain, Number(event.assetId));
          const collateralToken = this.getToken(options.chain, Number(args.collateralId));

          if (indexToken && collateralToken) {
            const trader = normalizeAddress(event.trader);
            const amount = new BigNumber(args.amount.toString())
              .multipliedBy(new BigNumber(args.assetPrice.toString()))
              .dividedBy(1e36)
              .toString(10);

            let action: KnownAction;
            if (signature === MuxEventSignatures.OpenPosition) {
              if (args.isLong) {
                action = 'increaseLong';
              } else {
                action = 'increaseShort';
              }
            } else if (signature === MuxEventSignatures.ClosePosition) {
              if (args.isLong) {
                action = 'decreaseLong';
              } else {
                action = 'decreaseShort';
              }
            } else {
              if (args.isLong) {
                action = 'liquidateLong';
              } else {
                action = 'liquidateShort';
              }
            }

            // on perpetual protocol increase/decrease leverage action
            // amount should be position size (or delta) in USD
            // the first token is index token, the second is collateral token
            const transactionAction = this.buildUpAction({
              ...options,
              action: action,
              addresses: [trader],
              tokens: [indexToken, collateralToken],
              tokenAmounts: [],
            });
            transactionAction.usdAmounts = [amount];

            actions.push(transactionAction);
          }

          break;
        }
      }
    }

    return actions;
  }
}
