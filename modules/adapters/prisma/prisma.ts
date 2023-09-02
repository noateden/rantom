import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { compareAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { LiquityAdapter } from '../liquity/liquity';

const Signatures = {
  TotalStakesUpdated: '0x6bac5e0eb3c44eb03a60ab11ec3a2c051771616aecadbcfff2630aabae520382',
};

interface LiquityMarket {
  chain: string;
  debtToken: Token;
  collToken: Token;
  troveManager: string;
}

export class PrismaAdapter extends LiquityAdapter {
  public readonly name: string = 'adapter.prisma';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  protected async getMarket(options: AdapterParseLogOptions): Promise<LiquityMarket | null> {
    // prisma uses the same borrow operation contract for all collateral tokens
    // however, it doesn't emit any info about which collateral token is being used in the TroveUpdated event
    // for now, we find the contract emit log: TotalStakesUpdated in the same transaction

    if (!options.context) {
      const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
      options.context = await web3.eth.getTransactionReceipt(options.hash as string);
    }

    for (const log of options.context.logs) {
      if (log.topics[0] === Signatures.TotalStakesUpdated) {
        for (const market of this.config.staticData.markets) {
          if (compareAddress(market.troveManager, log.address)) {
            return market;
          }
        }
      }
    }

    return null;
  }
}
