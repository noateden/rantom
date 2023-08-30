import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
};

export class SommelierAdapter extends Adapter {
  public readonly name: string = 'adapter.sommelier';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: config.customEventMapping
        ? config.customEventMapping[Signatures.Deposit]
        : EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: config.customEventMapping
        ? config.customEventMapping[Signatures.Withdraw]
        : EventSignatureMapping[Signatures.Withdraw],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
      this.eventMappings[signature]
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const action: KnownAction = signature === Signatures.Deposit ? 'deposit' : 'withdraw';
      const owner = normalizeAddress(event.owner);
      const caller = normalizeAddress(event.caller);

      const token: Token = this.config.staticData.assets[normalizeAddress(address)];
      const amount = new BigNumber(event.assets.toString())
        .dividedBy(new BigNumber(10).pow(token.decimals))
        .toString(10);

      return {
        protocol: this.config.protocol,
        action: action,
        tokens: [token],
        tokenAmounts: [amount],
        addresses: [owner, caller],
        readableString: `${owner} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${options.chain}`,
      };
    }

    return null;
  }
}
