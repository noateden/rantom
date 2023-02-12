import Web3 from 'web3';

import { EventSignatureMapping } from '../../configs/mappings';
import logger from '../../lib/logger';
import { EventMapping } from '../../types/configs';
import { ILogParser } from '../../types/namespaces';
import { LogParserOptions } from '../../types/options';

export class LogParser implements ILogParser {
  public readonly name = 'log';

  public mapping: { [key: string]: EventMapping } = EventSignatureMapping;

  constructor() {}

  public async tryParsingLogs(options: LogParserOptions): Promise<any> {
    const signature = options.topics[0];
    if (this.mapping[signature]) {
      const web3 = new Web3();
      try {
        return web3.eth.abi.decodeLog(this.mapping[signature].abi, `${options.data}`, options.topics.slice(1));
      } catch (e: any) {
        logger.onError({
          service: this.name,
          message: 'found topic signature but can not parse data',
          props: {
            signature: options.topics[0],
            data: options.data,
          },
        });
      }
    }

    return null;
  }
}
