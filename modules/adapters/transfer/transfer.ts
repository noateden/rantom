import { normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { NonFungibleToken, Token } from '../../../types/configs';
import { TokenTransfer } from '../../../types/domains';
import { ContextServices, ITransferAdapter } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import { TransferAbiMappings, TransferErc721Abi, TransferEventSignatures } from './abis';

export default class TransferAdapter implements ITransferAdapter {
  public readonly name: string = 'adapter.transfer';
  public readonly services: ContextServices;

  constructor(services: ContextServices) {
    this.services = services;
  }

  public supportedSignature(signature: string): boolean {
    return signature === TransferEventSignatures.Transfer;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<TokenTransfer | null> {
    const signature = options.log.topics[0];
    const web3 = this.services.blockchain.getProvider(options.chain);

    if (signature === TransferEventSignatures.Transfer) {
      try {
        const event: any = web3.eth.abi.decodeLog(
          TransferAbiMappings[signature].abi,
          options.log.data,
          options.log.topics.slice(1)
        );
        const token: Token | null = await this.services.blockchain.getTokenInfo({
          chain: options.chain,
          address: options.log.address,
        });
        if (token) {
          return {
            token: token,
            from: normalizeAddress(event.from),
            to: normalizeAddress(event.to),
            amount: formatFromDecimals(event.value.toString(), token.decimals),
          };
        }
      } catch (e: any) {
        // try with ERC721
        const event: any = web3.eth.abi.decodeLog(TransferErc721Abi.abi, options.log.data, options.log.topics.slice(1));
        const token: NonFungibleToken | null = await this.services.blockchain.getNonFungibleTokenInfo({
          chain: options.chain,
          address: options.log.address,
          tokenId: event.tokenId,
        });
        if (token) {
          return {
            token: token,
            from: normalizeAddress(event.from),
            to: normalizeAddress(event.to),
            amount: '1',
          };
        }
      }
    }

    return null;
  }
}
