import BigNumber from 'bignumber.js';

import { AddressZero, Tokens } from '../../../configs/constants';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

export class LidoAdapter extends Adapter {
  public readonly name: string = 'adapter.uniswapv3';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers);
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, signature, event } = options;
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      // found action on this protocol
      if (signature === '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a') {
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);
        return {
          protocol: this.config.protocol,
          action: 'stake',
          tokens: [Tokens.ethereum.ETH],
          tokenAmounts: [amount],
          addresses: [normalizeAddress(event.sender), normalizeAddress(event.referral)],
          readableString: `${normalizeAddress(event.sender)} stakes ${amount} ETH${
            compareAddress(event.referral, AddressZero)
              ? ''
              : ' using referral address ' + normalizeAddress(event.referral)
          } on ${this.config.protocol} chain ${options.chain}`,
        };
      }
    }

    return null;
  }
}
