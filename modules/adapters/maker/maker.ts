import { MakerConfig, MakerGemConfig } from '../../../configs/protocols/maker';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { MakerAbiMappings, MakerEventSignatures } from './abis';

export default class MakerAdapter extends Adapter {
  public readonly name: string = 'adapter.maker';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = MakerAbiMappings;
  }

  protected getGemConfig(chain: string, logAddress: string): MakerGemConfig | null {
    for (const config of (this.config as MakerConfig).contracts) {
      if (compareAddress(config.address, logAddress) && config.chain === chain) {
        return config as MakerGemConfig;
      }
    }
    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const config: MakerConfig = this.config as MakerConfig;
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);

      if (signature === MakerEventSignatures.DaiFlashloan) {
        const event = web3.eth.abi.decodeLog(
          this.eventMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );

        const amount = formatFromDecimals(event.amount, config.debtToken.decimals);
        const receiver = normalizeAddress(event.receiver);

        actions.push(
          this.buildUpAction({
            ...options,
            action: 'flashloan',
            addresses: [receiver],
            tokens: [config.debtToken],
            tokenAmounts: [amount],
          })
        );
      } else {
        if (compareAddress(options.log.address, config.debtJoin.address)) {
          const borrower = normalizeAddress(web3.eth.abi.decodeParameter('address', options.log.topics[1]).toString());
          const amount = formatFromDecimals(
            web3.eth.abi.decodeParameter('uint256', options.log.topics[3]).toString(),
            config.debtToken.decimals
          );
          const action: KnownAction = signature === MakerEventSignatures.GemJoin ? 'borrow' : 'repay';

          actions.push(
            this.buildUpAction({
              ...options,
              action: action,
              addresses: [borrower],
              tokens: [config.debtToken],
              tokenAmounts: [amount],
            })
          );
        } else if (signature === MakerEventSignatures.GemJoin || signature === MakerEventSignatures.GemExit) {
          const gem = this.getGemConfig(options.chain, options.log.address);
          if (gem) {
            const depositor = normalizeAddress(
              web3.eth.abi.decodeParameter('address', options.log.topics[1]).toString()
            );
            const amount = formatFromDecimals(
              web3.eth.abi.decodeParameter('uint256', options.log.topics[3]).toString(),
              gem.collateral.decimals
            );
            const action: KnownAction = signature === MakerEventSignatures.GemExit ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [depositor],
                tokens: [gem.collateral],
                tokenAmounts: [amount],
              })
            );
          }
        } else if (signature === MakerEventSignatures.AuthGemJoin || signature === MakerEventSignatures.AuthGemExit) {
          const gem = this.getGemConfig(options.chain, options.log.address);
          if (gem) {
            const event = web3.eth.abi.decodeLog(
              this.eventMappings[signature].abi,
              options.log.data,
              options.log.topics.slice(1)
            );
            const depositor = event.urn ? normalizeAddress(event.urn) : normalizeAddress(event.usr);
            const amount = formatFromDecimals(event.amt.toString(), gem.collateral.decimals);
            const action: KnownAction = signature === MakerEventSignatures.AuthGemJoin ? 'deposit' : 'withdraw';

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [depositor],
                tokens: [gem.collateral],
                tokenAmounts: [amount],
              })
            );
          }
        }
      }
    }

    return actions;
  }
}
