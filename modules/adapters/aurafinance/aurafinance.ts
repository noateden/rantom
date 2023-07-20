import { Tokens } from '../../../configs/constants';
import { ProtocolConfig, Token } from '../../../types/configs';
import { GlobalProviders } from '../../../types/namespaces';
import { ConvexAdapter } from '../convex/convex';

export class AurafinanceAdapter extends ConvexAdapter {
  public readonly name: string = 'adapter.aurafinance';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  protected getStakingToken(chain: string, stakingContract: string): Token | null {
    switch (chain) {
      case 'ethereum': {
        switch (stakingContract) {
          case '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2': {
            return Tokens.ethereum.auraBAL;
          }
          case '0x5e5ea2048475854a5702f5b8468a51ba1296efcc': {
            return Tokens.ethereum.auraBAL;
          }
        }
      }
    }

    return null;
  }

  protected getRewardToken(chain: string, stakingContract: string): Token | null {
    switch (chain) {
      case 'ethereum': {
        switch (stakingContract) {
          case '0x00a7ba8ae7bca0b10a32ea1f8e2a1da980c6cad2': {
            return Tokens.ethereum.BAL;
          }
          case '0x5e5ea2048475854a5702f5b8468a51ba1296efcc': {
            return Tokens.ethereum.BAL;
          }
        }
      }
    }

    return null;
  }
}
