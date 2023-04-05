import axios from 'axios';

import { Contract, ProtocolSubgraphConfig } from '../../../types/configs';
import { TradingEvent } from '../../../types/domains';
import { GlobalProviders } from '../../../types/namespaces';
import { UniswapHelper } from '../../adapters/uniswap/helper';
import { SubgraphWorker } from '../subgraph';

export class UniswapWorkerHook extends SubgraphWorker {
  public readonly name: string = 'worker.uniswap';

  constructor(providers: GlobalProviders, contracts: Array<Contract>, subgraphs: Array<ProtocolSubgraphConfig>) {
    super(providers, contracts, subgraphs);
  }

  protected async querySubgraph(config: ProtocolSubgraphConfig, timestamp: number): Promise<any> {
    return await axios.post(config.endpoint, {
      query: `
						{
							swaps(first: 1000, where: {timestamp_gte: ${timestamp}}, orderBy: timestamp, orderDirection: asc) {
								transaction {
									id  
									${config.filters && config.filters.transactionBlockNumber ? config.filters.transactionBlockNumber : 'blockNumber'}
								}
								${config.version === 'univ2' ? 'pair' : 'pool'} {
									id
									token0 {
										id
										symbol
										decimals
									}
									token1 {
										id
										symbol
										decimals
									}
								}
								sender
								timestamp
								logIndex
								
								${config.version === 'univ2' ? 'to' : 'recipient'}
								${config.version === 'univ2' ? 'amount0In\namount0Out\namount1In\namount1Out' : ''}
								${config.version === 'univ3' ? 'amount0\namount1' : ''}
							}
						}
					`,
    });
  }

  protected transformSwapEvent(config: ProtocolSubgraphConfig, events: Array<any>): Array<TradingEvent> {
    return UniswapHelper.transformSubgraphSwapEvent(config, events);
  }
}
