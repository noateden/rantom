import { ProtocolSubgraphConfig } from '../../../types/configs';
import { GlobalProviders, ISubgraphJobProvider } from '../../../types/namespaces';
import { SubgraphJobRunOptions } from '../../../types/options';

export class SubgraphJobProvider implements ISubgraphJobProvider {
  public readonly name: string = 'job.subgraph';
  public readonly config: ProtocolSubgraphConfig;
  public readonly providers: GlobalProviders;

  constructor(config: ProtocolSubgraphConfig, providers: GlobalProviders) {
    this.config = config;
    this.providers = providers;
  }

  public async run(options: SubgraphJobRunOptions): Promise<void> {}
}
