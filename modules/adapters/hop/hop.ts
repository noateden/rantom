import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import HopBridgeAbi from '../../../configs/abi/hop/L2Erc20Bridge.json';
import { AddressZero } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import logger from '../../../lib/logger';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures: { [key: string]: string } = {
  TransferToL2: '0x0a0607688c86ec1775abcdbab7b33a3a35a6c9cde677c9be880150c231cc6b0b',
};

export class HopAdapter extends Adapter {
  public readonly name: string = 'adapter.hop';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TransferToL2]: EventSignatureMapping[Signatures.TransferToL2],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (
      this.config.contracts[chain] &&
      this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1 &&
      EventSignatureMapping[signature]
    ) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(EventSignatureMapping[signature].abi, data, topics.slice(1));

      try {
        if (signature === Signatures.TransferToL2) {
          let tokenAddr = AddressZero;
          if (!compareAddress(address, '0xb8901acb165ed027e32754e0ffe830802919727f')) {
            tokenAddr = await this.getRpcWrapper().queryContract({
              chain,
              abi: HopBridgeAbi,
              contract: address,
              method: 'l1CanonicalToken',
              params: [],
            });
          }

          const token = await this.getWeb3Helper().getErc20Metadata(chain, tokenAddr);
          if (token) {
            const recipient = normalizeAddress(event.recipient);
            const amount = new BigNumber(event.amount).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);

            return {
              protocol: this.config.protocol,
              action: 'bridge',
              tokens: [token],
              tokenAmounts: [amount],
              addresses: [recipient],
              readableString: `${recipient} bridge ${amount} ${
                token.symbol
              } from ${chain} to ${event.chainId.toString()} on ${this.config.protocol}`,
              addition: {
                fromChain: chain,
                toChain: event.chainId.toString(),
              },
            };
          }
        }
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'failed to get event data',
          props: {
            protocol: this.config.protocol,
            signature: signature,
            address: normalizeAddress(address),
          },
          error: e,
        });
      }
    }

    return null;
  }
}
