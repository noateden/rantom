import { MorphoConfig } from '../../../configs/protocols/morpho';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { MorphoAavev3AbiMappings, MorphoAbiMappings, MorphoEventSignatures } from './abis';

export default class MorphoAdapter extends Adapter {
  public readonly name: string = 'adapter.morpho';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = {
      ...MorphoAbiMappings,
      ...MorphoAavev3AbiMappings,
    };
  }

  protected async parseEventLogV1(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);
    const event = web3.eth.abi.decodeLog(
      MorphoAbiMappings[signature].abi,
      options.log.data,
      options.log.topics.slice(1)
    );

    const poolToken = event._poolToken ? event._poolToken : event._poolTokenCollateral;

    let token = null;
    for (const contract of (this.config as MorphoConfig).contracts) {
      for (const market of contract.markets) {
        if (options.chain === market.chain && compareAddress(market.market, poolToken)) {
          token = market.token;
        }
      }
    }

    if (token) {
      let action: KnownAction = 'deposit';
      let addresses: Array<string> = [];
      let amount = formatFromDecimals(
        event._amount ? event._amount.toString() : event._amountSeized.toString(),
        token.decimals
      );

      switch (signature) {
        case MorphoEventSignatures.Supplied: {
          addresses = [normalizeAddress(event._from), normalizeAddress(event._onBehalf)];
          break;
        }
        case MorphoEventSignatures.Withdrawn: {
          action = 'withdraw';
          addresses = [normalizeAddress(event._supplier), normalizeAddress(event._receiver)];
          break;
        }
        case MorphoEventSignatures.Borrowed: {
          action = 'borrow';
          addresses = [normalizeAddress(event._borrower)];
          break;
        }
        case MorphoEventSignatures.Repaid: {
          action = 'repay';
          addresses = [normalizeAddress(event._repayer), normalizeAddress(event._onBehalf)];
          break;
        }
        case MorphoEventSignatures.Liquidated: {
          action = 'liquidate';
          addresses = [normalizeAddress(event._liquidator), normalizeAddress(event._liquidated)];
          amount = formatFromDecimals(event._amountSeized.toString(), token.decimals);
          break;
        }
      }

      actions.push(
        this.buildUpAction({
          ...options,
          action: action,
          addresses,
          tokens: [token],
          tokenAmounts: [amount],
        })
      );
    }

    return actions;
  }

  protected async parseEventLogV2(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);
    const event = web3.eth.abi.decodeLog(
      MorphoAavev3AbiMappings[signature].abi,
      options.log.data,
      options.log.topics.slice(1)
    );

    const token = await this.services.blockchain.getTokenInfo({
      chain: options.chain,
      address: event.underlying ? event.underlying : event.underlyingCollateral,
    });

    if (token) {
      let action: KnownAction = 'deposit';
      let addresses: Array<string> = [];
      let amount = formatFromDecimals(event.amount ? event.amount : event.amountSeized, token.decimals);

      switch (signature) {
        case MorphoEventSignatures.Supplied:
        case MorphoEventSignatures.CollateralSupplied: {
          addresses = [normalizeAddress(event.from), normalizeAddress(event.onBehalf)];
          break;
        }
        case MorphoEventSignatures.AaveV3Withdrawn:
        case MorphoEventSignatures.CollateralWithdrawn: {
          action = 'withdraw';
          addresses = [
            normalizeAddress(event.caller),
            normalizeAddress(event.onBehalf),
            normalizeAddress(event.receiver),
          ];
          break;
        }
        case MorphoEventSignatures.AaveV3Borrowed: {
          action = 'borrow';
          addresses = [
            normalizeAddress(event.caller),
            normalizeAddress(event.onBehalf),
            normalizeAddress(event.receiver),
          ];
          break;
        }
        case MorphoEventSignatures.Repaid: {
          action = 'repay';
          addresses = [normalizeAddress(event.repayer), normalizeAddress(event.onBehalf)];
          break;
        }
        case MorphoEventSignatures.Liquidated: {
          action = 'liquidate';
          addresses = [normalizeAddress(event.liquidator), normalizeAddress(event.borrower)];
          amount = formatFromDecimals(event._amountSeized, token.decimals);
          break;
        }
      }

      actions.push(
        this.buildUpAction({
          ...options,
          action,
          addresses,
          tokens: [token],
          tokenAmounts: [amount],
        })
      );
    }

    return actions;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    for (const contract of (this.config as MorphoConfig).contracts) {
      if (options.chain === contract.chain && compareAddress(options.log.address, contract.address)) {
        if (contract.version === 1) {
          return await this.parseEventLogV1(options);
        } else if (contract.version === 2) {
          return await this.parseEventLogV2(options);
        }
      }
    }

    return [];
  }
}
