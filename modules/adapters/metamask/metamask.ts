import { formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { MetamaskAbiMappings, MetamaskFunctionSignatures } from './abis';

export default class MetamaskAdapter extends Adapter {
  public readonly name: string = 'adapter.metamask';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = MetamaskAbiMappings;
  }

  public async parseInputData(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.transaction.input.slice(0, 10);
    if (
      options.transaction &&
      this.eventMappings[signature] &&
      this.supportedContract(options.chain, options.transaction.to)
    ) {
      const web3 = this.services.blockchain.getProvider(options.chain);

      if (signature === MetamaskFunctionSignatures.Swap) {
        try {
          const transactionParams = web3.eth.abi.decodeParameters(
            ['string', 'address', 'uint256', 'bytes'],
            options.transaction.input.slice(10)
          );
          const tokenIn = await this.services.blockchain.getTokenInfo({
            chain: options.chain,
            address: transactionParams[1].toString(),
          });
          if (tokenIn) {
            const amountIn = formatFromDecimals(transactionParams[2].toString(), tokenIn.decimals);

            let tokenOutAddress = null;
            let amountOut = '0';
            if (transactionParams[0] === 'airswapLight3FeeDynamic') {
              const callData = transactionParams[3].slice(0, 322);
              const parsedParams = web3.eth.abi.decodeParameters(
                ['uint256', 'uint256', 'address', 'address', 'uint256'],
                callData
              );
              tokenOutAddress = parsedParams[3].toString();
              amountOut = parsedParams[4].toString();
            } else {
              const callData = transactionParams[3].slice(0, 258);
              const parsedParams = web3.eth.abi.decodeParameters(
                ['address', 'address', 'uint256', 'uint256'],
                callData
              );
              tokenOutAddress = parsedParams[1].toString();
              amountOut = parsedParams[3].toString();
            }
            const tokenOut = await this.services.blockchain.getTokenInfo({
              chain: options.chain,
              address: tokenOutAddress,
            });

            if (tokenOut) {
              amountOut = formatFromDecimals(amountOut, tokenOut.decimals);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: 'trade',
                  addresses: [normalizeAddress(options.transaction.from)],
                  tokens: [tokenIn, tokenOut],
                  tokenAmounts: [amountIn, amountOut],
                })
              );
            }
          }
        } catch (e: any) {}
      }
    }

    return actions;
  }
}
