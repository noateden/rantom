import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import ERC20Abi from '../../../configs/abi/ERC20.json';
import { AddressZero, Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { AbracadabraCauldron } from './helper';

const Signatures = {
  LogAddCollateral: '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87',
  LogRemoveCollateral: '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402',
  LogBorrow: '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24',
  LogRepay: '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e',
  LogLiquidation: '0x66b108dc29b952efc76dccea9b82dce6b59fab4d9af73d8dcc9789afcad5daf6',

  // for sSPELL deposit/withdraw
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  // for mSPELL deposit/withdraw/collect
  Deposit: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
  Withdraw: '0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364',
  ClaimReward: '0xba8de60c3403ec381d1d484652ea1980e3c3e56359195c92525bff4ce47ad98e',
};

export class AbracadabraAdapter extends Adapter {
  public readonly name: string = 'adapter.abracadabra';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.LogAddCollateral]: EventSignatureMapping[Signatures.LogAddCollateral],
      [Signatures.LogRemoveCollateral]: EventSignatureMapping[Signatures.LogRemoveCollateral],
      [Signatures.LogBorrow]: EventSignatureMapping[Signatures.LogBorrow],
      [Signatures.LogRepay]: EventSignatureMapping[Signatures.LogRepay],
      [Signatures.LogLiquidation]: EventSignatureMapping[Signatures.LogLiquidation],
      [Signatures.Transfer]: EventSignatureMapping[Signatures.Transfer],
      [Signatures.Deposit]: EventSignatureMapping[Signatures.Deposit],
      [Signatures.Withdraw]: EventSignatureMapping[Signatures.Withdraw],
      [Signatures.ClaimReward]: EventSignatureMapping[Signatures.ClaimReward],
    });
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const rpcWrapper = await this.getRpcWrapper();

    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
      if (signature === Signatures.Transfer) {
        // sSPELL staking
        const from = normalizeAddress(event.from);
        const to = normalizeAddress(event.to);
        if (compareAddress(from, AddressZero) || compareAddress(to, AddressZero)) {
          let blockNumber = 0;
          if (options.context) {
            blockNumber = options.context.blockNumber;
          } else {
            const tx = await web3.eth.getTransactionReceipt(options.hash as string);
            blockNumber = tx.blockNumber;
          }

          if (blockNumber > 0) {
            // SPELL amount = sSPELL amount * SPELL per sSPELL
            // SPELL per sSPELL = SPELL balance / sSPELL total supply
            const balance = await rpcWrapper.queryContract({
              chain,
              abi: ERC20Abi,
              contract: Tokens.ethereum.SPELL.address,
              method: 'balanceOf',
              params: [address],
              blockNumber: blockNumber,
            });
            const supply = await rpcWrapper.queryContract({
              chain,
              abi: ERC20Abi,
              contract: Tokens.ethereum.SPELL.address,
              method: 'totalSupply',
              params: [],
              blockNumber: blockNumber,
            });

            const rate = new BigNumber(balance.toString()).dividedBy(new BigNumber(supply.toString()));
            const spellAmount = new BigNumber(event.value.toString()).multipliedBy(rate).dividedBy(1e18).toString(10);
            const action: KnownAction = compareAddress(from, AddressZero) ? 'deposit' : 'withdraw';
            const user = compareAddress(from, AddressZero) ? to : from;

            return {
              protocol: this.config.protocol,
              action: action,
              addresses: [user],
              tokens: [Tokens.ethereum.SPELL],
              tokenAmounts: [spellAmount],
              readableString: `${user} ${action} ${spellAmount} ${Tokens.ethereum.SPELL.symbol} on ${this.config.protocol} chain ${chain}`,
            };
          }
        }
      } else if (
        signature === Signatures.Deposit ||
        signature === Signatures.Withdraw ||
        signature === Signatures.ClaimReward
      ) {
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

        // mSpell staking
        let token = Tokens.ethereum.SPELL;
        let action: KnownAction = 'deposit';
        if (signature === Signatures.Withdraw) {
          action = 'withdraw';
        }
        if (signature === Signatures.ClaimReward) {
          action = 'collect';
          token = Tokens.ethereum.MIM;
        }

        const user = normalizeAddress(event.user);
        const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [user],
          tokens: [token],
          tokenAmounts: [amount],
          readableString: `${user} ${action} ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
        };
      }
    } else {
      let cauldronInfo: AbracadabraCauldron | null = null;
      if (this.config.staticData && this.config.staticData.cauldrons) {
        for (const cauldron of this.config.staticData.cauldrons) {
          if (compareAddress(cauldron.address, address)) {
            cauldronInfo = cauldron;
          }
        }
      }

      if (cauldronInfo) {
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));
        if (signature === Signatures.LogAddCollateral || signature === Signatures.LogRemoveCollateral) {
          const action: KnownAction = signature === Signatures.LogAddCollateral ? 'deposit' : 'withdraw';
          const from = normalizeAddress(event.from);
          const to = normalizeAddress(event.to);
          const amount = new BigNumber(event.share)
            .dividedBy(new BigNumber(10).pow(cauldronInfo.token.decimals))
            .toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [from, to],
            tokens: [cauldronInfo.token],
            tokenAmounts: [amount],
            readableString: `${from} ${action} ${amount} ${cauldronInfo.token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.LogBorrow || signature === Signatures.LogRepay) {
          const action: KnownAction = signature === Signatures.LogBorrow ? 'borrow' : 'repay';
          const from = normalizeAddress(event.from);
          const to = normalizeAddress(event.to);
          const amount = new BigNumber(event.amount).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [from, to],
            tokens: [Tokens[chain].MIM],
            tokenAmounts: [amount],
            readableString: `${from} ${action} ${amount} ${Tokens[chain].MIM.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        } else if (signature === Signatures.LogLiquidation) {
          const from = normalizeAddress(event.from);
          const user = normalizeAddress(event.user);
          const amount = new BigNumber(event.collateralShare)
            .dividedBy(new BigNumber(10).pow(cauldronInfo.token.decimals))
            .toString(10);
          const debtAmount = new BigNumber(event.borrowAmount).dividedBy(1e18).toString(10);

          return {
            protocol: this.config.protocol,
            action: 'liquidate',
            addresses: [from, user],
            tokens: [cauldronInfo.token],
            tokenAmounts: [amount],
            readableString: `${from} liquidate ${amount} ${cauldronInfo.token.symbol} on ${this.config.protocol} chain ${chain}`,
            addition: {
              debtToken: Tokens[chain].MIM,
              debtAmount: debtAmount,
            },
          };
        }
      }
    }

    return null;
  }
}
