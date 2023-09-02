import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import StabilityPoolAbi from '../../../configs/abi/liquity/StabilityPool.json';
import TroveManagerAbi from '../../../configs/abi/liquity/TroveManager.json';
import { Tokens } from '../../../configs/constants';
import EnvConfig from '../../../configs/envConfig';
import { EventSignatureMapping } from '../../../configs/mappings';
import { compareAddress, normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig, Token } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';

const Signatures = {
  Transfer: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',

  // we index TroveUpdated event on borrow operations in case: borrow, repay
  // we index TroveUpdated event on trove manager in case of redeem
  TroveUpdated: '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b',
  TroveLiquidated: '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434',

  // stability pool deposit/withdraw
  UserDepositChanged: '0xbce78369dccab09eec1986f4d409ab09ffbb47d65423e5148fcf98411c5111c9',

  // collect ETH reward from stability pool
  ETHGainWithdrawn: '0x51457222ebca92c335c9c86e2baa1cc0e40ffaa9084a51452980d5ba8dec2f63',

  // collect LQTY reward from stability pool
  LQTYPaidToDepositor: '0x2608b986a6ac0f6c629ca37018e80af5561e366252ae93602a96d3ab2e73e42d',
  LQTYPaidToFrontEnd: '0xcd2cdc1a4af71051394e9c6facd9a266b2ac5bd65d219a701eeda009f47682bf',
};

interface LiquityMarket {
  chain: string;
  debtToken: Token;
  collToken: Token;
  troveManager: string;
}

interface GetTroveStateOptions {
  chain: string;
  hash: string; // transaction hash
  context: any;
  event: any;
  market: LiquityMarket;
}

interface GetTroveStateInfo {
  debtAmount: string;
  collAmount: string;
  isBorrow: boolean;
}

export class LiquityAdapter extends Adapter {
  public readonly name: string = 'adapter.liquity';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.TroveUpdated]: EventSignatureMapping[Signatures.TroveUpdated],
      [Signatures.TroveLiquidated]: EventSignatureMapping[Signatures.TroveLiquidated],
      [Signatures.UserDepositChanged]: EventSignatureMapping[Signatures.UserDepositChanged],
      [Signatures.ETHGainWithdrawn]: EventSignatureMapping[Signatures.ETHGainWithdrawn],
      [Signatures.LQTYPaidToDepositor]: EventSignatureMapping[Signatures.LQTYPaidToDepositor],
      [Signatures.LQTYPaidToFrontEnd]: EventSignatureMapping[Signatures.LQTYPaidToFrontEnd],
    });
  }

  private async getMarket(options: any): Promise<LiquityMarket> {
    return this.config.staticData.markets[0];
  }

  private async getTroveState(options: GetTroveStateOptions): Promise<GetTroveStateInfo> {
    const web3 = new Web3(EnvConfig.blockchains[options.chain].nodeRpc);
    const rpcWrapper = this.getRpcWrapper();

    // get trove snapshot from previous block
    let blockNumber = options.context ? options.context.blockNumber : null;
    if (!blockNumber) {
      const transaction = await web3.eth.getTransaction(options.hash as string);
      blockNumber = transaction.blockNumber;
    }
    const troveInfo = await rpcWrapper.queryContract({
      chain: options.chain,
      abi: TroveManagerAbi,
      contract: options.market.troveManager,
      method: 'Troves',
      params: [options.event._borrower],
      blockNumber: blockNumber - 1,
    });

    const previousDebt = new BigNumber(troveInfo.debt);
    const newDebt = new BigNumber(options.event._debt);
    const previousColl = new BigNumber(troveInfo.coll);
    const newColl = new BigNumber(options.event._coll);

    return {
      debtAmount: newDebt.minus(previousDebt).abs().dividedBy(1e18).toString(10),
      collAmount: newColl.minus(previousColl).abs().dividedBy(1e18).toString(10),
      isBorrow: previousDebt.lte(newDebt),
    };
  }

  public async tryParsingActions(options: AdapterParseLogOptions): Promise<TransactionAction | null> {
    const { chain, address, topics, data } = options;

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(address) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const rpcWrapper = this.getRpcWrapper();
      const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, data, topics.slice(1));

      if (signature === Signatures.TroveUpdated) {
        let redeem = false;
        for (const market of this.config.staticData.markets) {
          if (market.chain === chain && compareAddress(market.troveManager, address)) {
            redeem = true;
          }
        }

        // liquity has only one market, LUSD-ETH
        const market = await this.getMarket(options);

        if (!redeem) {
          // borrow/repay with borrow operation
          const borrower = normalizeAddress(event._borrower);
          const operation = Number(event._operation);

          let debtAmount = '0';
          let collAmount = '0';

          let action: KnownAction = operation === 0 ? 'borrow' : 'repay';
          let subAction: KnownAction = operation === 0 ? 'deposit' : 'withdraw';

          if (operation === 0 || operation === 1) {
            // open or close trove
            debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);
            collAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);
          } else {
            // get trove snapshot from previous block
            const info: GetTroveStateInfo = await this.getTroveState({
              chain,
              hash: options.hash as string,
              context: options.context,
              event,
              market,
            });

            action = info.isBorrow ? 'borrow' : 'repay';
            subAction = info.isBorrow ? 'deposit' : 'withdraw';
            debtAmount = info.debtAmount;
            collAmount = info.collAmount;
          }

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [market.debtToken],
            tokenAmounts: [debtAmount],
            readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.LUSD.symbol} on ${this.config.protocol} chain ${chain}`,
            subActions: [
              {
                protocol: this.config.protocol,
                action: subAction,
                addresses: [borrower],
                tokens: [market.collToken],
                tokenAmounts: [collAmount],
                readableString: `${borrower} ${subAction} ${collAmount} ${market.collToken.symbol} on ${this.config.protocol} chain ${chain}`,
              },
            ],
          };
        } else {
          // redeem on trove manager
          const info: GetTroveStateInfo = await this.getTroveState({
            chain,
            hash: options.hash as string,
            context: options.context,
            event,
            market,
          });

          const borrower = normalizeAddress(event._borrower);
          const action = info.isBorrow ? 'borrow' : 'repay';
          const subAction = info.isBorrow ? 'deposit' : 'withdraw';
          const debtAmount = info.debtAmount;
          const collAmount = info.collAmount;

          return {
            protocol: this.config.protocol,
            action: action,
            addresses: [borrower],
            tokens: [market.debtToken],
            tokenAmounts: [debtAmount],
            readableString: `${borrower} ${action} ${debtAmount} ${Tokens.ethereum.LUSD.symbol} on ${this.config.protocol} chain ${chain}`,
            subActions: [
              {
                protocol: this.config.protocol,
                action: subAction,
                addresses: [borrower],
                tokens: [market.collToken],
                tokenAmounts: [collAmount],
                readableString: `${borrower} ${subAction} ${collAmount} ${market.collToken.symbol} on ${this.config.protocol} chain ${chain}`,
              },
            ],
          };
        }
      } else if (signature === Signatures.TroveLiquidated) {
        const borrower = normalizeAddress(event._borrower);
        const collAmount = new BigNumber(event._coll).dividedBy(1e18).toString(10);
        const debtAmount = new BigNumber(event._debt).dividedBy(1e18).toString(10);

        return {
          protocol: this.config.protocol,
          action: 'liquidate',
          addresses: [borrower],
          tokens: [Tokens.ethereum.NativeCoin],
          tokenAmounts: [collAmount],
          readableString: `${borrower} liquidate ${collAmount} ${Tokens.ethereum.NativeCoin.symbol} on ${this.config.protocol} chain ${chain}`,
          addition: {
            debtToken: Tokens.ethereum.LUSD,
            debtAmount: debtAmount,
          },
        };
      } else if (signature === Signatures.UserDepositChanged) {
        const depositor = normalizeAddress(event._depositor);
        const newDeposit = new BigNumber(event._newDeposit).dividedBy(1e18);

        // get balance snapshot from previous block
        let blockNumber = options.context ? options.context.blockNumber : null;
        if (!blockNumber) {
          const transaction = await web3.eth.getTransaction(options.hash as string);
          blockNumber = transaction.blockNumber;
        }

        const depositInfo = await rpcWrapper.queryContract({
          chain,
          abi: StabilityPoolAbi,
          contract: address,
          method: 'deposits',
          params: [depositor],
          blockNumber: blockNumber - 1,
        });

        const token = this.config.staticData.borrowTokens[chain] as Token;
        const amount = newDeposit.minus(new BigNumber(depositInfo.initialValue.toString()).dividedBy(1e18));
        const action: KnownAction = amount.gt(0) ? 'deposit' : 'withdraw';

        return {
          protocol: this.config.protocol,
          action: action,
          addresses: [depositor],
          tokens: [token],
          tokenAmounts: [amount.abs().toString(10)],
          readableString: `${depositor} ${action} ${amount.abs().toString(10)} ${token.symbol} on ${
            this.config.protocol
          } chain ${chain}`,
        };
      } else if (signature === Signatures.ETHGainWithdrawn) {
        const depositor = normalizeAddress(event._depositor);
        const amount = new BigNumber(event._ETH).dividedBy(1e18).toString(10);

        if (amount !== '0') {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [depositor],
            tokens: [Tokens.ethereum.ETH],
            tokenAmounts: [amount],
            readableString: `${depositor} collect ${amount} ${Tokens.ethereum.ETH.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      } else if (signature === Signatures.LQTYPaidToDepositor || signature === Signatures.LQTYPaidToFrontEnd) {
        const depositor = normalizeAddress(event._depositor ? event._depositor : event._frontEnd);
        const amount = new BigNumber(event._LQTY).dividedBy(1e18).toString(10);
        const token: Token = this.config.staticData.rewardTokens[chain] as Token;

        if (amount !== '0') {
          return {
            protocol: this.config.protocol,
            action: 'collect',
            addresses: [depositor],
            tokens: [token],
            tokenAmounts: [amount],
            readableString: `${depositor} collect ${amount} ${token.symbol} on ${this.config.protocol} chain ${chain}`,
          };
        }
      }
    }

    return null;
  }
}
