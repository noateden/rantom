import Web3 from 'web3';

import { AddressZero, Tokens } from '../../../configs/constants';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196',
  Withdraw: '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',
};

export class TornadocashAdapter extends Adapter {
  public readonly name: string = 'adapter.tornadocash';

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
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(address) !== -1 &&
      (signature === Signatures.Deposit || signature === Signatures.Withdraw)
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const user = event.to ? normalizeAddress(event.to) : await this.getSenderAddress(options);
      const relayer = signature === Signatures.Deposit ? AddressZero : normalizeAddress(event.relayer);
      const token = this.config.staticData
        ? this.config.staticData.pools[normalizeAddress(address)].token
        : Tokens.ethereum.NativeCoin;
      const amount = this.config.staticData ? this.config.staticData.pools[normalizeAddress(address)].amount : 0;

      return {
        protocol: this.config.protocol,
        action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
        addresses: signature === Signatures.Deposit ? [user] : [user, relayer],
        tokens: [token],
        tokenAmounts: [amount],
        readableString: `${user} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
          token.symbol
        } on ${this.config.protocol} chain ${chain}`,
      };
    }

    return null;
  }
}
