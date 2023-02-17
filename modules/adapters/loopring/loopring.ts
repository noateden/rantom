import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0x73ff7b101bcdc22f199e8e1dd9893170a683d6897be4f1086ca05705abb886ae',
  Withdraw: '0x0d22d7344fc6871a839149fd89f9fd88a6c29cf797a67114772a9d4df5f8c96b',
};

export class LoopringAdapter extends Adapter {
  public readonly name: string = 'adapter.loopring';

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
      (signature === Signatures.Deposit || signature === Signatures.Withdraw) &&
      this.config.contracts[chain].indexOf(address) !== 1
    ) {
      const web3 = new Web3();
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      const token = await this.getWeb3Helper().getErc20Metadata(chain, event.token);

      if (token) {
        const fromAddr = normalizeAddress(event.from);
        const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
        return {
          protocol: this.config.protocol,
          action: signature === Signatures.Deposit ? 'deposit' : 'withdraw',
          addresses: [fromAddr, normalizeAddress(event.to)],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${fromAddr} ${signature === Signatures.Deposit ? 'deposit' : 'withdraw'} ${amount} ${
            token.symbol
          } on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
