import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  RecipeEvent: '0xb6cd938f99beba85b61cc813aa1c12ba1b95f797dfb6ddd567c0f361f3e77574',
  ActionDirectEvent: '0xf28c1e8e1a8c97027796e625e1ed041028c9642e14da6e7ad2c18838a59a2d8c',
};

export class DefisaverAdapter extends Adapter {
  public readonly name: string = 'adapter.defisaver';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.RecipeEvent]: EventSignatureMapping[Signatures.RecipeEvent],
      [Signatures.ActionDirectEvent]: EventSignatureMapping[Signatures.ActionDirectEvent],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics } = options;

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const signature = topics[0];
      const sender = await this.getSenderAddress(options);

      if (signature === Signatures.ActionDirectEvent) {
        return {
          protocol: this.config.protocol,
          action: 'useContract',
          addresses: [sender],
          tokens: [],
          tokenAmounts: [],
          readableString: `${sender} use contract on ${this.config.protocol} chain ${chain}`,
        };
      } else if (signature === Signatures.RecipeEvent) {
        return {
          protocol: this.config.protocol,
          action: 'executeRecipe',
          addresses: [sender],
          tokens: [],
          tokenAmounts: [],
          readableString: `${sender} use contract on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
