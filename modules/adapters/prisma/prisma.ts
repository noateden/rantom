import { LiquityConfig, LiquityMarket } from '../../../configs/protocols/liquity';
import { compareAddress } from '../../../lib/utils';
import { ProtocolConfig } from '../../../types/configs';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import { LiquityAbiMappings } from '../liquity/abis';
import LiquityAdapter from '../liquity/liquity';
import { PrismaEventSignatures } from './abis';

export default class PrismaAdapter extends LiquityAdapter {
  public readonly name: string = 'adapter.prisma';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, config);

    this.config = config;
    this.eventMappings = LiquityAbiMappings;
  }

  protected getMarket(options: ParseEventLogOptions): LiquityMarket | null {
    // prisma uses the same borrow operation contract for all collateral tokens
    // however, it doesn't emit any info about which collateral token is being used in the TroveUpdated event
    // for now, we find the contract emit log: TotalStakesUpdated in the same transaction

    for (const log of options.allLogs) {
      if (log.topics[0] === PrismaEventSignatures.TotalStakesUpdated) {
        for (const market of (this.config as LiquityConfig).markets) {
          if (compareAddress(market.troveManager.address, log.address)) {
            return market;
          }
        }
      }
    }

    return null;
  }
}
