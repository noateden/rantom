import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { NativeAbiMappings, NativeEventSignatures } from './abis';

export default class NativeAdapter extends Adapter {
  public readonly name: string = 'adapter.native';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = NativeAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);
    const event: any = web3.eth.abi.decodeLog(
      this.eventMappings[signature].abi,
      options.log.data,
      options.log.topics.slice(1)
    );

    if (signature === NativeEventSignatures.Swap && this.supportedContract(options.chain, options.log.address)) {
      const tokenIn = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.tokenIn,
      });
      const tokenOut = await this.services.blockchain.getTokenInfo({
        chain: options.chain,
        address: event.tokenOut,
      });

      if (tokenIn && tokenOut) {
        const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
        const amountOut = new BigNumber(event.amountOut.toString())
          .abs()
          .dividedBy(new BigNumber(10).pow(tokenOut.decimals))
          .toString(10);

        const sender = normalizeAddress(event.sender);
        const recipient = normalizeAddress(event.recipient);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'trade',
            addresses: [sender, recipient],
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
          })
        );
      }
    }

    return actions;
  }
}
