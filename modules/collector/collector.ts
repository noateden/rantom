import { Token } from '../../types/configs';
import { AddressStats, ProtocolStats } from '../../types/domains';
import { GlobalProviders, ICollectorProvider } from '../../types/namespaces';
import { CollectorGetAddressStatsOptions, CollectorGetProtocolStatsOptions } from '../../types/options';

export class CollectorProvider implements ICollectorProvider {
  public readonly name: string = 'collector';
  public providers: GlobalProviders;

  constructor(providers: GlobalProviders) {
    this.providers = providers;
  }

  protected async collectProtocolStats(protocol: string): Promise<ProtocolStats> {
    const collections = await this.providers.mongodb.requireCollections();
    const documents: Array<any> = await collections.logsCollection
      .aggregate([
        {
          $unwind: '$tokens',
        },
        {
          $group: { _id: { protocol: '$protocol', action: '$action', token: '$tokens' } },
        },
        {
          $match: { '_id.protocol': protocol },
        },
      ])
      .toArray();

    const metrics: ProtocolStats = {
      protocol,
      actions: [],
      tokens: [],
    };

    const actions: { [key: string]: boolean } = {};
    const tokens: { [key: string]: boolean } = {};
    for (const document of documents) {
      if (!actions[document._id.action]) {
        metrics.actions.push(document._id.action);
        actions[document._id.action] = true;
      }

      const tokenKey = `${document._id.token.chain}:${document._id.token.address}`;
      if (!tokens[tokenKey]) {
        metrics.tokens.push(document._id.token as Token);
        tokens[tokenKey] = true;
      }
    }

    return metrics;
  }

  protected async collectAddressStats(address: string): Promise<AddressStats> {
    const collections = await this.providers.mongodb.requireCollections();
    const documents: Array<any> = await collections.logsCollection
      .aggregate([
        {
          $unwind: '$addresses',
        },
        {
          $unwind: '$tokens',
        },
        {
          $group: { _id: { address: '$addresses', protocol: '$protocol', action: '$action', token: '$tokens' } },
        },
        {
          $match: { '_id.address': address },
        },
      ])
      .toArray();

    const metrics: AddressStats = {
      address: address,
      protocols: [],
      actions: [],
      tokens: [],
    };

    const protocols: { [key: string]: boolean } = {};
    const actions: { [key: string]: boolean } = {};
    const tokens: { [key: string]: boolean } = {};
    for (const document of documents) {
      if (!actions[document._id.action]) {
        metrics.actions.push(document._id.action);
        actions[document._id.action] = true;
      }

      if (!protocols[document._id.protocol]) {
        metrics.protocols.push(document._id.protocol);
        protocols[document._id.protocol] = true;
      }

      const tokenKey = `${document._id.token.chain}:${document._id.token.address}`;
      if (!tokens[tokenKey]) {
        metrics.tokens.push(document._id.token as Token);
        tokens[tokenKey] = true;
      }
    }

    return metrics;
  }

  public async getProtocolStats(options: CollectorGetProtocolStatsOptions): Promise<ProtocolStats | null> {
    return await this.collectProtocolStats(options.protocol);
  }

  public async getAddressStats(options: CollectorGetAddressStatsOptions): Promise<AddressStats | null> {
    return await this.collectAddressStats(options.address);
  }

  public async run(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
