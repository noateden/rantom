import BigNumber from 'bignumber.js';

import { TokenList } from '../../../configs';
import Erc20Abi from '../../../configs/abi/ERC20.json';
import { AddressZero } from '../../../configs/constants/addresses';
import { AbracadabraConfig, AbracadabraMarket } from '../../../configs/protocols/abracadabra';
import { compareAddress, normalizeAddress } from '../../../lib/utils';
import { formatFromDecimals } from '../../../lib/utils';
import { ContractConfig, ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { ContextServices } from '../../../types/namespaces';
import { ParseEventLogOptions } from '../../../types/options';
import Adapter from '../adapter';
import { TransferAbiMappings, TransferEventSignatures } from '../transfer/abis';
import { AbracadabraAbiMappings, AbracadabraEventSignatures } from './abis';

export default class AbracadabraAdapter extends Adapter {
  public readonly name: string = 'adapter.abracadabra';
  public readonly config: ProtocolConfig;

  constructor(services: ContextServices, config: ProtocolConfig) {
    super(services, {
      protocol: config.protocol,
      contracts: config.contracts as Array<ContractConfig>,
    });

    this.config = config;
    this.eventMappings = AbracadabraAbiMappings;
    this.eventMappings[TransferEventSignatures.Transfer] = TransferAbiMappings[TransferEventSignatures.Transfer];
  }

  protected getMarket(marketAddress: string): AbracadabraMarket | null {
    for (const market of (this.config as AbracadabraConfig).contracts) {
      if (compareAddress(marketAddress, market.address)) {
        return market as AbracadabraMarket;
      }
    }

    return null;
  }

  public async parseEventLog(options: ParseEventLogOptions): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];

    if (this.supportedContract(options.chain, options.log.address)) {
      const signature = options.log.topics[0];
      const web3 = this.services.blockchain.getProvider(options.chain);
      const event = web3.eth.abi.decodeLog(
        this.eventMappings[signature].abi,
        options.log.data,
        options.log.topics.slice(1)
      );

      if (
        signature === AbracadabraEventSignatures.mSpellDeposit ||
        signature === AbracadabraEventSignatures.mSpellWithdraw ||
        signature === AbracadabraEventSignatures.mSpellClaimReward ||
        signature === TransferEventSignatures.Transfer
      ) {
        switch (signature) {
          // mSpell
          case AbracadabraEventSignatures.mSpellDeposit:
          case AbracadabraEventSignatures.mSpellWithdraw:
          case AbracadabraEventSignatures.mSpellClaimReward: {
            const action: KnownAction =
              signature === AbracadabraEventSignatures.mSpellDeposit
                ? 'deposit'
                : signature === AbracadabraEventSignatures.mSpellWithdraw
                ? 'withdraw'
                : 'collect';
            const user = normalizeAddress(event.user);
            const amount = formatFromDecimals(event.amount.toString(), TokenList.ethereum.SPELL.decimals);

            actions.push(
              this.buildUpAction({
                ...options,
                action: action,
                addresses: [user],
                tokens: [TokenList.ethereum.SPELL],
                tokenAmounts: [amount],
              })
            );

            break;
          }

          // sSpell
          case TransferEventSignatures.Transfer: {
            const from = normalizeAddress(event.from);
            const to = normalizeAddress(event.to);
            if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
              // SPELL amount = sSPELL amount * SPELL per sSPELL
              // SPELL per sSPELL = SPELL balance / sSPELL total supply
              const balance = await this.services.blockchain.singlecall({
                chain: options.chain,
                target: TokenList.ethereum.SPELL.address,
                abi: Erc20Abi,
                method: 'balanceOf',
                params: [options.log.address],
                blockNumber: options.log.blockNumber,
              });
              const supply = await this.services.blockchain.singlecall({
                chain: options.chain,
                target: options.log.address,
                abi: Erc20Abi,
                method: 'totalSupply',
                params: [],
                blockNumber: options.log.blockNumber,
              });

              const rate = new BigNumber(balance.toString()).dividedBy(new BigNumber(supply.toString()));
              const spellAmount = new BigNumber(event.value.toString()).multipliedBy(rate).dividedBy(1e18).toString(10);
              const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
              const user = compareAddress(from, AddressZero) ? to : from;

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: action,
                  addresses: [user],
                  tokens: [TokenList.ethereum.SPELL],
                  tokenAmounts: [spellAmount],
                })
              );

              break;
            }
          }
        }
      } else {
        const market = this.getMarket(options.log.address);
        if (market) {
          switch (signature) {
            // borrow
            case AbracadabraEventSignatures.LogAddCollateral:
            case AbracadabraEventSignatures.LogRemoveCollateral: {
              const action: KnownAction =
                signature === AbracadabraEventSignatures.LogAddCollateral ? 'deposit' : 'withdraw';
              const from = normalizeAddress(event.from);
              const to = normalizeAddress(event.to);
              const amount = formatFromDecimals(event.share.toString(), market.collateralToken.decimals);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: action,
                  addresses: [from, to],
                  tokens: [market.collateralToken],
                  tokenAmounts: [amount],
                })
              );

              break;
            }
            case AbracadabraEventSignatures.LogBorrow:
            case AbracadabraEventSignatures.LogRepay: {
              const action: KnownAction = signature === AbracadabraEventSignatures.LogBorrow ? 'borrow' : 'repay';
              const from = normalizeAddress(event.from);
              const to = normalizeAddress(event.to);
              const amount = formatFromDecimals(event.amount.toString(), market.debtToken.decimals);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: action,
                  addresses: [from, to],
                  tokens: [market.debtToken],
                  tokenAmounts: [amount],
                })
              );

              break;
            }
            case AbracadabraEventSignatures.LogLiquidation: {
              const from = normalizeAddress(event.from);
              const user = normalizeAddress(event.user);
              const amount = formatFromDecimals(event.collateralShare.toString(), market.collateralToken.decimals);
              const debtAmount = formatFromDecimals(event.borrowAmount.toString(), market.debtToken.decimals);

              actions.push(
                this.buildUpAction({
                  ...options,
                  action: 'liquidate',
                  addresses: [from, user],
                  tokens: [market.collateralToken, market.debtToken],
                  tokenAmounts: [amount, debtAmount],
                })
              );

              break;
            }
          }
        }
      }
    }

    return actions;
  }
}
