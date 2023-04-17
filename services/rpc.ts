import Web3 from 'web3';

import EnvConfig from '../configs/envConfig';
import { normalizeAddress } from '../lib/helper';
import logger from '../lib/logger';
import { IRpcWrapperProvider, ISentryProvider } from '../types/namespaces';
import { RpcWrapperQueryContractOptions } from '../types/options';

export class RpcWrapperProvider implements IRpcWrapperProvider {
  public readonly name: string = 'rpc';

  protected readonly sentryProvider: ISentryProvider | null;

  constructor(sentryProvider: ISentryProvider | null) {
    this.sentryProvider = sentryProvider;
  }

  public async queryContract(options: RpcWrapperQueryContractOptions): Promise<any> {
    const { chain, abi, contract, method, params } = options;

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const theContract = new web3.eth.Contract(abi, contract);

    try {
      if (options.blockNumber) {
        return await theContract.methods[method](...params).call(options.blockNumber);
      } else {
        return await theContract.methods[method](...params).call();
      }
    } catch (e: any) {
      logger.onWarn({
        service: this.name,
        message: 'failed to query contract data',
        props: {
          chain,
          contract: normalizeAddress(contract),
          method: method,
          error: e.message,
        },
      });
    }

    return null;
  }
}
