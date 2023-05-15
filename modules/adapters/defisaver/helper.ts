import BigNumber from 'bignumber.js';
import Web3 from 'web3';

import { Tokens } from '../../../configs/constants';
import { DefisaverActions } from '../../../configs/policies/defisaverActions';
import { normalizeAddress } from '../../../lib/helper';
import { Web3HelperProvider } from '../../../services/web3';
import { ProtocolConfig } from '../../../types/configs';
import { KnownAction, TransactionAction } from '../../../types/domains';
import { AdapterParseLogOptions } from '../../../types/options';

export interface ParseDefisaverActionOptions {
  context: AdapterParseLogOptions;
  actionId: string;
  data: string;
}

export class DefisaverHelper {
  public static async parseAction(
    protocolConfig: ProtocolConfig,
    options: ParseDefisaverActionOptions
  ): Promise<Array<TransactionAction>> {
    const actions: Array<TransactionAction> = [];
    const web3 = new Web3();

    for (const [, actionConfig] of Object.entries(DefisaverActions)) {
      if (actionConfig.actionId === options.actionId) {
        try {
          const web3Helper = new Web3HelperProvider(null);
          const params = web3.eth.abi.decodeParameters(actionConfig.params, options.data);

          switch (actionConfig.actionName) {
            case 'AaveSupply':
            case 'AaveWithdraw':
            case 'AaveBorrow':
            case 'AavePayback': {
              const token = await web3Helper.getErc20Metadata(options.context.chain, params[1]);
              if (token) {
                const tokens = [token];
                const amount = new BigNumber(params[2]).dividedBy(new BigNumber(10).pow(token.decimals)).toString(10);
                let addresses: Array<string> = [];
                if (actionConfig.actionName === 'AaveSupply') {
                  addresses = [normalizeAddress(params[3]), normalizeAddress(params[4])];
                }
                if (actionConfig.actionName === 'AaveWithdraw') {
                  addresses = [normalizeAddress(params[3])];
                }
                if (actionConfig.actionName === 'AaveBorrow' || actionConfig.actionName === 'AavePayback') {
                  addresses = [normalizeAddress(params[4]), normalizeAddress(params[5])];
                }

                let action: KnownAction = 'deposit';
                if (actionConfig.actionName === 'AaveWithdraw') action = 'withdraw';
                if (actionConfig.actionName === 'AaveBorrow') action = 'borrow';
                if (actionConfig.actionName === 'AavePayback') action = 'repay';

                actions.push({
                  protocol: protocolConfig.protocol,
                  action: action,
                  addresses,
                  tokens,
                  tokenAmounts: [amount],
                  readableString: `${addresses[0]} ${action} ${amount} ${token.symbol} on ${protocolConfig.protocol} chain ${options.context.chain}`,
                  addition: {
                    protocolLayer1: 'aavev2',
                  },
                });
              }
              break;
            }
            case 'LiquitySupply':
            case 'LiquityWithdraw':
            case 'LiquityBorrow':
            case 'LiquityPayback': {
              if (actionConfig.actionName === 'LiquitySupply' || actionConfig.actionName === 'LiquityWithdraw') {
                const ethAmount = new BigNumber(params[0]).dividedBy(1e18).toString(10);
                const addresses: Array<string> = [normalizeAddress(params[1])];
                const action: KnownAction = actionConfig.actionName === 'LiquitySupply' ? 'deposit' : 'withdraw';

                actions.push({
                  protocol: protocolConfig.protocol,
                  action: action,
                  addresses,
                  tokens: [Tokens.ethereum.NativeCoin],
                  tokenAmounts: [ethAmount],
                  readableString: `${addresses[0]} ${action} ${ethAmount} ETH on ${protocolConfig.protocol} chain ${options.context.chain}`,
                  addition: {
                    protocolLayer1: 'liquity',
                  },
                });
              } else {
                const lusdAmount = new BigNumber(params[1]).dividedBy(1e18).toString(10);
                const addresses: Array<string> = [normalizeAddress(params[2])];
                const action: KnownAction = actionConfig.actionName === 'LiquityBorrow' ? 'borrow' : 'repay';

                actions.push({
                  protocol: protocolConfig.protocol,
                  action: action,
                  addresses,
                  tokens: [Tokens.ethereum.LUSD],
                  tokenAmounts: [lusdAmount],
                  readableString: `${addresses[0]} ${action} ${lusdAmount} LUSD on ${protocolConfig.protocol} chain ${options.context.chain}`,
                  addition: {
                    protocolLayer1: 'liquity',
                  },
                });
              }
              break;
            }
            case 'LiquityOpen': {
              const ethAmount = new BigNumber(params[1]).dividedBy(1e18).toString(10);
              const lusdAmount = new BigNumber(params[2]).dividedBy(1e18).toString(10);
              const addresses: Array<string> = [normalizeAddress(params[3]), normalizeAddress(params[4])];

              actions.push({
                protocol: protocolConfig.protocol,
                action: 'deposit',
                addresses,
                tokens: [Tokens.ethereum.NativeCoin],
                tokenAmounts: [ethAmount],
                readableString: `${addresses[0]} deposit ${ethAmount} ETH on ${protocolConfig.protocol} chain ${options.context.chain}`,
                addition: {
                  protocolLayer1: 'liquity',
                },
              });
              actions.push({
                protocol: protocolConfig.protocol,
                action: 'borrow',
                addresses,
                tokens: [Tokens.ethereum.LUSD],
                tokenAmounts: [lusdAmount],
                readableString: `${addresses[0]} deposit ${lusdAmount} LUSD on ${protocolConfig.protocol} chain ${options.context.chain}`,
                addition: {
                  protocolLayer1: 'liquity',
                },
              });
            }
          }
        } catch (e: any) {}
      }
    }

    return actions;
  }
}
