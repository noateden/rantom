import Web3 from 'web3';

import { MaxExploreTransactions } from '../../configs';
import EnvConfig from '../../configs/envConfig';
import logger from '../../lib/logger';
import { Transaction } from '../../types/domains';
import { IExplorerProvider, IParserProvider } from '../../types/namespaces';
import { ExploreLatestTransactionsOptions } from '../../types/options';

export class ExplorerProvider implements IExplorerProvider {
  public readonly name: string = 'explorer';
  public parser: IParserProvider;

  constructor(parser: IParserProvider) {
    this.parser = parser;
  }

  public async exploreLatestTransactions(options: ExploreLatestTransactionsOptions): Promise<Array<Transaction>> {
    const { chain } = options;
    const transactions: Array<Transaction> = [];
    try {
      const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
      const blockNumber = await web3.eth.getBlockNumber();
      const block = await web3.eth.getBlock(blockNumber, false);

      for (const tx of block.transactions) {
        const txs: Array<Transaction> = await this.parser.parseTransaction({ hash: tx, force: true });
        for (const parsedTx of txs) {
          if (parsedTx.actions.length > 0) {
            transactions.push(parsedTx);
          }
        }

        if (transactions.length >= MaxExploreTransactions) {
          break;
        }
      }
    } catch (e: any) {
      logger.onError({
        service: this.name,
        message: 'failed to get latest on-chain data',
        props: {
          chain: chain,
        },
        error: e,
      });
    }

    return transactions;
  }
}
