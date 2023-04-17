import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import ExactlyMarketAbi from '../../../configs/abi/exactly/Market.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
  Borrow: '0x96558a334f4759f0e7c423d68c84721860bd8fbf94ddc4e55158ecb125ad04b5',
  Repay: '0xe4a1ae657f49cb1fb1c7d3a94ae6093565c4c8c0e03de488f79c377c3c3a24e0',
  DepositAtMaturity: '0xd9900507c64720c1a5e11858a42769b599616268b832495aa6afe8b9dc566e76',
  WithdrawAtMaturity: '0xe57dbac0e7c42ad5f3b0fadb9c065565377cf771054fca70d35c96e01f9ec53c',
  BorrowAtMaturity: '0x66866b472f27d55d69496091bbd651907b2fb1041b3eeaca6e565ae5b5af4013',
  RepayAtMaturity: '0xf17fce321dd9fb005136a80c0bfb3789e455b7a70be9eb8922f1ad20a80d1a33',
};

export class ExactlyAdapter extends Adapter {
  public readonly name: string = 'adapter.exactly';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: config.customEventMapping
        ? config.customEventMapping[Signatures.Deposit]
        : EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: config.customEventMapping
        ? config.customEventMapping[Signatures.Withdraw]
        : EventSignatureMapping[Signatures.Withdraw],

      [Signatures.Borrow]: EventSignatureMapping[Signatures.Borrow],
      [Signatures.Repay]: EventSignatureMapping[Signatures.Repay],
      [Signatures.DepositAtMaturity]: EventSignatureMapping[Signatures.DepositAtMaturity],
      [Signatures.WithdrawAtMaturity]: EventSignatureMapping[Signatures.WithdrawAtMaturity],
      [Signatures.BorrowAtMaturity]: EventSignatureMapping[Signatures.BorrowAtMaturity],
      [Signatures.RepayAtMaturity]: EventSignatureMapping[Signatures.RepayAtMaturity],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let token: Token | null = null;
      if (this.config.staticData) {
        for (const market of this.config.staticData.markets) {
          if (compareAddress(market.address, address)) {
            token = market.asset;
          }
        }
      } else {
        const contract = new web3.eth.Contract(ExactlyMarketAbi as any, address);
        const asset = await contract.methods.asset().call();
        token = await this.getWeb3Helper().getErc20Metadata(chain, asset);
      }

      if (token) {
        const amount = new BigNumber(event.assets.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);
        const caller = normalizeAddress(event.caller);
        const user = event.owner ? normalizeAddress(event.owner) : normalizeAddress(event.borrower);
        let action: KnownAction = 'deposit';
        if (signature === Signatures.Withdraw || signature === Signatures.WithdrawAtMaturity) {
          action = 'withdraw';
        }
        if (signature === Signatures.Borrow || signature.toString() === Signatures.BorrowAtMaturity) {
          action = 'borrow';
        }
        if (signature === Signatures.Repay || signature === Signatures.RepayAtMaturity) {
          action = 'repay';
        }

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [caller, user],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${caller} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    }

    return null;
  }
}
