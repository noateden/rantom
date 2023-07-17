import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import VesselManagerAbi from '../../../configs/abi/gravita/VesselManager.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  VesselUpdated: '0xd03b2126581644d5026a8e77091b71644f3f16efe9d9e5930c4d533301c731e8',
};

export class GravitaAdapter extends Adapter {
  public readonly name: string = 'adapter.gravita';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.VesselUpdated]: EventSignatureMapping[Signatures.VesselUpdated],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      const token = await this.getWeb3Helper().getErc20Metadata(chain, event._asset);
      if (token) {
        const borrower = normalizeAddress(event._borrower);
        const debts = new BigNumber(event._debt.toString()).dividedBy(1e18).toString();
        const collateral = new BigNumber(event._coll.toString())
          .dividedBy(new BigNumber(10).pow(token.decimals))
          .toString(10);

        const operation = Number(event.operation);
        if (operation === 0) {
          // open vault
          return {
            protocol: this.config.protocol,
            action: 'borrow',
            addresses: [borrower],
            tokens: [Tokens.ethereum.GRAI],
            tokenAmounts: [debts],
            readableString: `${borrower} borrow ${debts} GRAI on ${this.config.protocol} chain ${chain}`,
            subActions: [
              {
                protocol: this.config.protocol,
                action: 'deposit',
                addresses: [borrower],
                tokens: [token],
                tokenAmounts: [collateral],
                readableString: `${borrower} deposit ${collateral} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
              },
            ],
          };
        } else if (operation === 1 || operation === 2) {
          // adjust vault
          const borrower = normalizeAddress(event._borrower);

          // get vault state from previous block
          let blockNumber = options.context ? options.context.blockNumber : null;
          if (!blockNumber) {
            const transaction = await web3.eth.getTransaction(options.hash as string);
            blockNumber = transaction.blockNumber;
          }
          const vaultPreviousState = await rpcWrapper.queryContract({
            chain,
            abi: VesselManagerAbi,
            contract: this.config.staticData.vesselManagers[chain],
            method: 'Vessels',
            params: [borrower, token.address],
            blockNumber: blockNumber - 1,
          });

          if (vaultPreviousState) {
            const previousDebt = new BigNumber(vaultPreviousState.debt.toString()).dividedBy(1e18);
            const previousColl = new BigNumber(vaultPreviousState.coll.toString()).dividedBy(
              new BigNumber(10).pow(token.decimals)
            );

            if (operation === 1) {
              // close vault
              return {
                protocol: this.config.protocol,
                action: 'repay',
                addresses: [borrower],
                tokens: [Tokens.ethereum.GRAI],
                tokenAmounts: [previousDebt.toString(10)],
                readableString: `${borrower} repay ${previousDebt.toString(10)} GRAI on ${
                  this.config.protocol
                } chain ${chain}`,
                subActions: [
                  {
                    protocol: this.config.protocol,
                    action: 'withdraw',
                    addresses: [borrower],
                    tokens: [token],
                    tokenAmounts: [previousColl.toString(10)],
                    readableString: `${borrower} withdraw ${previousColl.toString(10)} ${token.symbol} on ${
                      this.config.protocol
                    } chain ${chain}`,
                  },
                ],
              };
            } else {
              const diffDebt = new BigNumber(debts).minus(previousDebt);
              const diffColl = new BigNumber(previousColl).minus(collateral);

              const action: KnownAction = diffDebt.gte(0) ? 'borrow' : 'repay';
              const subAction: KnownAction = diffColl.gte(0) ? 'deposit' : 'withdraw';

              return {
                protocol: this.config.protocol,
                action: action,
                addresses: [borrower],
                tokens: [Tokens.ethereum.GRAI],
                tokenAmounts: [diffDebt.abs().toString(10)],
                readableString: `${borrower} ${action} ${diffDebt.abs().toString(10)} GRAI on ${
                  this.config.protocol
                } chain ${chain}`,
                subActions: [
                  {
                    protocol: this.config.protocol,
                    action: subAction,
                    addresses: [borrower],
                    tokens: [token],
                    tokenAmounts: [diffColl.abs().toString(10)],
                    readableString: `${borrower} ${subAction} ${diffColl.abs().toString(10)} ${token.symbol} on ${
                      this.config.protocol
                    } chain ${chain}`,
                  },
                ],
              };
            }
          }
        }
      }
    }

    return null;
  }
}
