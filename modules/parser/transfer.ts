import BigNumber from 'bignumber.js';

import { normalizeAddress } from '../../lib/helper';
import logger from '../../lib/logger';
import { Web3HelperProvider } from '../../services/web3';
import { Token } from '../../types/configs';
import { TransactionTransfer } from '../../types/domains';
import { GlobalProviders, ITransferParser, IWeb3HelperProvider } from '../../types/namespaces';
import { TransferParseLogOptions } from '../../types/options';

export class TransferParser implements ITransferParser {
  public readonly name = 'transfer';

  public providers: GlobalProviders | null;

  constructor(providers: GlobalProviders | null) {
    this.providers = providers;
  }

  private getWeb3Helper(): IWeb3HelperProvider {
    if (this.providers) {
      return this.providers.web3Helper;
    } else {
      return new Web3HelperProvider();
    }
  }

  public async tryParsingTransfers(options: TransferParseLogOptions): Promise<TransactionTransfer | null> {
    const { chain, address, signature, event } = options;

    if (signature === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef') {
      try {
        const token: Token | null = await this.getWeb3Helper().getErc20Metadata(options.chain, options.address);
        if (token) {
          return {
            token,
            from: normalizeAddress(event.from),
            to: normalizeAddress(event.to),
            amount: new BigNumber(event.value.toString()).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10),
          };
        }
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'match transfer topic but can not parse data',
          props: {
            chain: chain,
            address: address,
            signature: signature,
          },
        });
      }
    }

    return null;
  }
}
