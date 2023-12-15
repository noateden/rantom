import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { MaverickAbiMappings, MaverickEventSignatures } from './abis';

export default class MaverickAdapter extends Adapter {
  public readonly name: string = 'adapter.maverick';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = MaverickAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    if (!this.eventMappings[signature]) {
      return actions;
    }

    const liquidityPool = await this.services.datastore.getLiquidityPoolConstant({
      chain: options.chain,
      protocol: this.config.protocol,
      address: options.log.address,
    });
    if (liquidityPool && this.supportedContract(options.chain, liquidityPool.factory)) {
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event: any = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      switch (signature) {
        case MaverickEventSignatures.Swap: {
          const tokenAIn = Boolean(event.tokenAIn);

          let tokenIn;
          let tokenOut;
          if (tokenAIn) {
            tokenIn = liquidityPool.tokens[0];
            tokenOut = liquidityPool.tokens[1];
          } else {
            tokenIn = liquidityPool.tokens[1];
            tokenOut = liquidityPool.tokens[0];
          }

          const amountIn = formatFromDecimals(event.amountIn.toString(), tokenIn.decimals);
          const amountOut = formatFromDecimals(event.amountOut.toString(), tokenOut.decimals);
          const sender = normalizeAddress(event.sender);
          const recipient = normalizeAddress(event.recipient);

          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: 'swap',
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [sender, recipient],
            tokens: [tokenIn, tokenOut],
            tokenAmounts: [amountIn, amountOut],
          });
          break;
        }
        case MaverickEventSignatures.AddLiquidity:
        case MaverickEventSignatures.RemoveLiquidity: {
          let amountA = new BigNumber(0);
          let amountB = new BigNumber(0);
          const binDeltas = event.binDeltas as unknown as Array<any>;
          for (const binDelta of binDeltas) {
            amountA = amountA.plus(new BigNumber(binDelta.deltaA.toString()).dividedBy(1e18));
            amountB = amountB.plus(new BigNumber(binDelta.deltaB.toString()).dividedBy(1e18));
          }

          const sender = normalizeAddress(event.sender);
          const recipient = event.recipient ? normalizeAddress(event.recipient) : sender;
          const action: KnownAction = signature === MaverickEventSignatures.AddLiquidity ? 'deposit' : 'withdraw';

          actions.push({
            chain: options.chain,
            protocol: this.config.protocol,
            action: action,
            transactionHash: options.log.transactionHash,
            logIndex: `${options.log.logIndex}:0`,
            blockNumber: Number(options.log.blockNumber),
            contract: normalizeAddress(options.log.address),
            addresses: [sender, recipient],
            tokens: [liquidityPool.tokens[0], liquidityPool.tokens[1]],
            tokenAmounts: [amountA.toString(10), amountB.toString(10)],
          });
          break;
        }
      }
    }

    return actions;
  }
}
