import EnvConfig from '../../../configs/envConfig';
import { LayerZeroChainIdMaps } from '../../../configs/protocols/stargate';
import { compareAddress, formatFromDecimals, normalizeAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { StargateAbiMappings, StargateEventSignatures } from './abis';

export default class StargateAdapter extends Adapter {
  public readonly name: string = 'adapter.stargate';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts,
    });

    this.config = config;
    this.eventMappings = StargateAbiMappings;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);

    if (
      signature === StargateEventSignatures.Mint ||
      signature === StargateEventSignatures.Burn ||
      signature === StargateEventSignatures.Swap ||
      signature === StargateEventSignatures.SwapRemote
    ) {
      const liquidityPool = await this.services.datastore.getLiquidityPoolConstant({
        chain: options.chain,
        protocol: this.config.protocol,
        address: normalizeAddress(options.log.address),
      });
      if (liquidityPool) {
        const event = web3.eth.abi.decodeLog(
          this.eventMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );
        switch (signature) {
          case StargateEventSignatures.Swap: {
            const amount = formatFromDecimals(event.amountSD.toString(), liquidityPool.tokens[0].decimals);
            const provider = normalizeAddress(event.from);

            const buildAction = this.buildUpAction({
              ...options,
              action: 'bridge',
              addresses: [provider],
              tokens: [liquidityPool.tokens[0]],
              tokenAmounts: [amount],
            });
            buildAction.addition = {
              fromChain: EnvConfig.blockchains[options.chain].chainId.toString(),
              toChain: LayerZeroChainIdMaps[Number(event.chainId)]
                ? LayerZeroChainIdMaps[Number(event.chainId)].toString()
                : `LayerZeroChainId:${event.chainId.toString()}`,
            };

            actions.push(buildAction);

            break;
          }
          case StargateEventSignatures.SwapRemote: {
            const amount = formatFromDecimals(event.amountSD.toString(), liquidityPool.tokens[0].decimals);
            const provider = normalizeAddress(event.to);

            // to determine the source chain, we look ing for CreditChainPath event in the same transaction
            for (const log of options.allLogs) {
              if (
                log.topics[0] === StargateEventSignatures.CreditChainPath &&
                compareAddress(log.address, options.log.address)
              ) {
                const creditChainPathEvent = web3.eth.abi.decodeLog(
                  this.eventMappings[StargateEventSignatures.CreditChainPath].abi,
                  log.data,
                  log.topics.slice(1)
                );
                const buildAction = this.buildUpAction({
                  ...options,
                  action: 'bridge',
                  addresses: [provider],
                  tokens: [liquidityPool.tokens[0]],
                  tokenAmounts: [amount],
                });
                buildAction.addition = {
                  fromChain: LayerZeroChainIdMaps[Number(creditChainPathEvent.chainId)]
                    ? LayerZeroChainIdMaps[Number(creditChainPathEvent.chainId)].toString()
                    : `LayerZeroChainId:${creditChainPathEvent.chainId.toString()}`,
                  toChain: EnvConfig.blockchains[options.chain].chainId.toString(),
                };
                actions.push(buildAction);
              }
            }

            break;
          }
          case StargateEventSignatures.Mint:
          case StargateEventSignatures.Burn: {
            const amount = formatFromDecimals(event.amountSD.toString(), liquidityPool.tokens[0].decimals);
            const provider = event.to ? normalizeAddress(event.to) : normalizeAddress(event.from);
            const action: KnownAction = signature === StargateEventSignatures.Mint ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [provider],
                tokens: [liquidityPool.tokens[0]],
                tokenAmounts: [amount],
              })
            );

            break;
          }
        }
      }
    }

    return actions;
  }
}
