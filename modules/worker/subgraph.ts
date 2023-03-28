import { Contract, ProtocolSubgraphConfig } from '../../types/configs';
import { GlobalProviders } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';
import { ContractWorker } from './worker';

export class SubgraphWorker extends ContractWorker {
  public readonly name: string = 'worker';
  public subgraphs: Array<ProtocolSubgraphConfig>;

  constructor(providers: GlobalProviders, contracts: Array<Contract>, subgraphs: Array<ProtocolSubgraphConfig>) {
    super(providers, contracts);

    this.subgraphs = subgraphs;
  }

  protected async indexSubgraphs(config: ProtocolSubgraphConfig, options: WorkerRunOptions): Promise<void> {}

  public async run(options: WorkerRunOptions): Promise<void> {
    await super.run(options);

    for (const subgraph of this.subgraphs) {
      await this.indexSubgraphs(subgraph, options);
    }
  }
}
