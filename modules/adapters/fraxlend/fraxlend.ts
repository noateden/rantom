import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import FraxlendPairAbi from '../../../configs/abi/fraxlend/FraxlendPair.json';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
  BorrowAsset: '0x01348584ec81ac7acd52b7d66d9ade986dd909f3d513881c190fc31c90527efe',
  RepayAsset: '0x9dc1449a0ff0c152e18e8289d865b47acc6e1b76b1ecb239c13d6ee22a9206a7',
  AddCollateral: '0xa32435755c235de2976ed44a75a2f85cb01faf0c894f639fe0c32bb9455fea8f',
  RemoveCollateral: '0xbc290bb45104f73cf92115c9603987c3f8fd30c182a13603d8cffa49b5f59952',
  Liquidate: '0x35f432a64bd3767447a456650432406c6cacb885819947a202216eeea6820ecf',
};

export class FraxlendAdapter extends Adapter {
  public readonly name: string = 'adapter.fraxlend';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.BorrowAsset]: EventSignatureMapping[Signatures.BorrowAsset],
      [Signatures.RepayAsset]: EventSignatureMapping[Signatures.RepayAsset],
      [Signatures.AddCollateral]: EventSignatureMapping[Signatures.AddCollateral],
      [Signatures.RemoveCollateral]: EventSignatureMapping[Signatures.RemoveCollateral],
      [Signatures.Liquidate]: EventSignatureMapping[Signatures.Liquidate],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      let asset = null;
      let collateral = null;
      if (this.config.staticData) {
        for (const pair of this.config.staticData.pairs) {
          if (compareAddress(pair.address, address)) {
            asset = pair.asset;
            collateral = pair.collateral;
          }
        }
      } else {
        const pairContract = new web3.eth.Contract(FraxlendPairAbi as any, address);
        const [assetAddress, collateralAddress] = await Promise.all([
          pairContract.methods.asset().call(),
          pairContract.methods.collateralContract().call(),
        ]);
        asset = await this.getWeb3Helper().getErc20Metadata(chain, assetAddress);
        collateral = await this.getWeb3Helper().getErc20Metadata(chain, collateralAddress);
      }

      if (asset && collateral) {
        switch (signature) {
          case Signatures.Deposit:
          case Signatures.Withdraw: {
            const amount = new BigNumber(event.assets.toString())
              .dividedBy(new BigNumber(10).pow(asset.decimals))
              .toString(10);
            const sender = normalizeAddress(event.sender);
            const owner = normalizeAddress(event.owner);
            const action: KnownAction = signature === Signatures.Deposit ? 'deposit' : 'withdraw';

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [owner, sender],
              tokens: [asset],
              tokenAmounts: [amount],
              readableString: `${owner} ${action} ${amount} ${asset.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.AddCollateral:
          case Signatures.RemoveCollateral: {
            const amount = new BigNumber(event._collateralAmount.toString())
              .dividedBy(new BigNumber(10).pow(collateral.decimals))
              .toString(10);
            const sender = normalizeAddress(event._sender);
            const borrower = normalizeAddress(event._borrower);
            const action: KnownAction = signature === Signatures.AddCollateral ? 'deposit' : 'withdraw';

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [borrower, sender],
              tokens: [collateral],
              tokenAmounts: [amount],
              readableString: `${borrower} ${action} ${amount} ${collateral.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.BorrowAsset:
          case Signatures.RepayAsset: {
            const amount = event._borrowAmount
              ? new BigNumber(event._borrowAmount.toString())
                  .dividedBy(new BigNumber(10).pow(asset.decimals))
                  .toString(10)
              : new BigNumber(event._amountToRepay.toString())
                  .dividedBy(new BigNumber(10).pow(asset.decimals))
                  .toString(10);
            const borrower = normalizeAddress(event._borrower);
            const action: KnownAction = signature === Signatures.BorrowAsset ? 'borrow' : 'repay';

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [borrower],
              tokens: [asset],
              tokenAmounts: [amount],
              readableString: `${borrower} ${action} ${amount} ${asset.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
          case Signatures.Liquidate: {
            const amount = new BigNumber(event._collateralForLiquidator.toString())
              .dividedBy(new BigNumber(10).pow(collateral.decimals))
              .toString(10);
            const borrower = normalizeAddress(event._borrower);

            return {
              protocol: this.config.protocol,
              action: 'liquidate',
              addresses: [borrower],
              tokens: [asset],
              tokenAmounts: [amount],
              readableString: `${borrower} liquidate ${amount} ${collateral.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      }
    }

    return null;
  }
}
