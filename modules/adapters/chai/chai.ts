import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import McdPotAbi from '../../../configs/abi/maker/McdPot.json';
import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  // We detect DAI deposit/withdraw by get the CHAI transfer events
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
};

export class ChaiAdapter extends Adapter {
  public readonly name: string = 'adapter.chai';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.Transfer) {
        const from = normalizeAddress(event.from);
        const to = normalizeAddress(event.to);

        if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
          let blockNumber = 0;
          let token = Tokens.ethereum.DAI;
          let daiRate = '0';

          try {
            if (options.blockNumber) {
              blockNumber = options.blockNumber;
            } else {
              const tx = await web3.eth.getTransactionReceipt(options.hash as string);
              blockNumber = tx.blockNumber;
            }
            daiRate = await rpcWrapper.queryContract({
              chain,
              abi: McdPotAbi,
              contract: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7', // DAI pot
              method: 'chi',
              params: [],
              blockNumber: blockNumber,
            });
          } catch (e: any) {}

          if (blockNumber > 0 && token) {
            const amount = new BigNumber(event.value)
              .multipliedBy(new BigNumber(daiRate.toString()))
              .dividedBy(1e27)
              .dividedBy(new BigNumber(10).pow(token.decimals))
              .toString(10);
            const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
            const user: string = compareAddress(from, AddressZero) ? to : from;

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [user],
              tokens: [token],
              tokenAmounts: [amount],
              readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
