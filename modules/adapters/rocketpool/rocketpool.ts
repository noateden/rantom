import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x6155cfd0fd028b0ca77e8495a60cbe563e8bce8611f0aad6fedbdaafc05d44a2',
  Withdraw: '0x19783b34589160c168487dc7f9c51ae0bcefe67a47d6708fba90f6ce0366d3d1',
};

export class RocketpoolAdapter extends Adapter {
  public readonly name: string = 'adapter.rocketpool';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain].indexOf(address) !== -1 &&
      (signature === Signatures.Deposit || signature === Signatures.Withdraw)
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const user = event.to ? normalizeAddress(event.to) : normalizeAddress(event.from);
      const amount = new BigNumber(event.ethAmount.toString()).dividedBy(1e18).toString(10);

      return {
        protocol: this.config.protocol,
        action: signature === Signatures.Deposit ? 'stake' : 'unstake',
        addresses: [user],
        tokens: [Tokens.ethereum.NativeCoin],
        tokenAmounts: [amount],
        readableString: `${user} ${signature === Signatures.Deposit ? 'stake' : 'unstake'} ${amount} ${
          Tokens.ethereum.NativeCoin.symbol
        } on ${this.config.protocol} chain ${chain}`,
      };
    }

    return null;
  }
}
