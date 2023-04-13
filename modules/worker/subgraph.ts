import { ProtocolConfig } from '../../types/configs';
import { GlobalProviders, IWorkerProvider } from '../../types/namespaces';
import { WorkerRunOptions } from '../../types/options';
import { UniswapSubgraphJob } from './subgraphs/uniswap';

export class SubgraphWorker implements IWorkerProvider {
  public readonly name: string = 'worker.subgraph';
  public readonly providers: GlobalProviders;

  private readonly configs: Array<ProtocolConfig>;

  constructor(providers: GlobalProviders, protocolConfigs: Array<ProtocolConfig>) {
    this.providers = providers;
    this.configs = protocolConfigs;
  }

  public async run(options: WorkerRunOptions): Promise<void> {
    for (const config of this.configs) {
      if (config.subgraphs) {
        for (const subgraph of config.subgraphs) {
          if (subgraph.version === 'univ2' || subgraph.version === 'univ3') {
            const worker = new UniswapSubgraphJob(subgraph, this.providers);
            await worker.run({ job: 'swap', fromTime: options.fromTime });
            await worker.run({ job: 'deposit', fromTime: options.fromTime });
            await worker.run({ job: 'withdraw', fromTime: options.fromTime });
          }
        }
      }
    }
  }
}
