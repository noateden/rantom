import Web3 from 'web3';

import EnvConfig from '../../../configs/envConfig';
import { Functions } from '../../../configs/functions';
import { EventSignatureMapping } from '../../../configs/mappings';
import { normalizeAddress } from '../../../lib/helper';
import { ProtocolConfig } from '../../../types/configs';
import { TransactionAction } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { AdapterParseLogOptions } from '../../../types/options';
import { Adapter } from '../adapter';
import { DefisaverHelper } from './helper';

const Signatures = {
  RecipeEvent: '0xb6cd938f99beba85b61cc813aa1c12ba1b95f797dfb6ddd567c0f361f3e77574',
  ActionDirectEvent: '0xf28c1e8e1a8c97027796e625e1ed041028c9642e14da6e7ad2c18838a59a2d8c',
};

export class DefisaverAdapter extends Adapter {
  public readonly name: string = 'adapter.defisaver';

  constructor(config: ProtocolConfig, providers: GlobalProviders | null) {
    super(config, providers, {
      [Signatures.RecipeEvent]: EventSignatureMapping[Signatures.RecipeEvent],
      [Signatures.ActionDirectEvent]: EventSignatureMapping[Signatures.ActionDirectEvent],
    });
  }

  public async tryParsingMultipleActions(options: AdapterParseLogOptions): Promise<Array<TransactionAction>> {
    const { chain, address, topics } = options;

    const actions: Array<TransactionAction> = [];

    const signature = topics[0];
    if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(normalizeAddress(address)) !== -1) {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      if (signature === Signatures.RecipeEvent) {
        const transactionData = options.input as string;
        const transactionFunction = transactionData.slice(0, 10);
        const transactionCallData = transactionData.slice(10);

        if (transactionFunction === Functions.dsProxyExecute) {
          const transactionParams = web3.eth.abi.decodeParameters(['address', 'bytes'], transactionCallData);
          const targetAddress = normalizeAddress(transactionParams[0]);
          if (this.config.contracts[chain] && this.config.contracts[chain].indexOf(targetAddress) !== -1) {
            const executeFunction = transactionParams[1].slice(0, 10);
            if (executeFunction === Functions.defisaverExecuteRecipe) {
              const executeData = transactionParams[1].slice(10);
              const executeParams = web3.eth.abi.decodeParameters(
                [
                  {
                    components: [
                      {
                        internalType: 'string',
                        name: 'name',
                        type: 'string',
                      },
                      {
                        internalType: 'bytes[]',
                        name: 'callData',
                        type: 'bytes[]',
                      },
                      {
                        internalType: 'bytes32[]',
                        name: 'subData',
                        type: 'bytes32[]',
                      },
                      {
                        internalType: 'bytes4[]',
                        name: 'actionIds',
                        type: 'bytes4[]',
                      },
                      {
                        internalType: 'uint8[][]',
                        name: 'paramMapping',
                        type: 'uint8[][]',
                      },
                    ],
                    internalType: 'struct StrategyModel.Recipe',
                    name: '_currRecipe',
                    type: 'tuple',
                  },
                ],
                executeData
              )[0];

              for (let i = 0; i < executeParams.actionIds.length; i++) {
                const parsedActions = await DefisaverHelper.parseAction(this.config, {
                  context: options,
                  actionId: executeParams.actionIds[i],
                  data: executeParams.callData[i],
                });
                for (const action of parsedActions) {
                  actions.push(action);
                }
              }
            }
          }
        }
      } else if (signature === Signatures.ActionDirectEvent) {
        const event = web3.eth.abi.decodeLog(this.eventMappings[signature].abi, options.data, topics.slice(1));
        const parsedActions = await DefisaverHelper.parseAction(this.config, {
          context: options,
          actionId: event.logName.slice(0, 10),
          data: event.data,
        });
        for (const action of parsedActions) {
          actions.push(action);
        }
      }
    }

    return actions;
  }
}
