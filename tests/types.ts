import { IAdapter } from '../types/namespaces';

export interface TestLog {
  chain: string;
  hash: string;
  sender: string;
  address: string;
  log: any;

  adapter: IAdapter;

  action: string;
}
