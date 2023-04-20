import { CarbonConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { CarbonAdapter } from '../../../modules/adapters/carbon/carbon';
import { TestLog } from '../../types';

export const CarbonActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0xcb2cac974372f9adf39da7ce30259ed1d98f9dd310963770f9461e59cfe9a564',
    sender: normalizeAddress('0x5f7a009664b771e889751f4fd721adc439033ecd'),
    address: normalizeAddress('0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1'),
    log: {
      address: '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1',
      topics: [
        '0x95f3b01351225fea0e69a46f68b164c9dea10284f12cd4a907ce66510ab7af6a',
        '0x0000000000000000000000005f7a009664b771e889751f4fd721adc439033ecd',
        '0x000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        '0x000000000000000000000000ae7ab96520de3a18e5e111b5eaab095312d7fe84',
      ],
      data: '0x00000000000000000000000000000000000000000000000000038d7ea4c6800000000000000000000000000000000000000000000000000000038299552187fe000000000000000000000000000000000000000000000000000001cd013258000000000000000000000000000000000000000000000000000000000000000000',
      blockNumber: '0x104bf29',
      transactionHash: '0xcb2cac974372f9adf39da7ce30259ed1d98f9dd310963770f9461e59cfe9a564',
      transactionIndex: '0x10e',
      blockHash: '0xb2d1ad3a2a04925ea64d6acf2f82d7ce89dac5b1e42b6c2876d478a1948ae38b',
      logIndex: '0x1ae',
      removed: false,
    },
    adapter: new CarbonAdapter(CarbonConfigs, null),
    action: 'swap',
  },
  {
    chain: 'ethereum',
    hash: '0x17cf2eee12a60d9ff7c779496c5ac92c42908d6b3c56c730dc6428b169fc27d8',
    sender: normalizeAddress('0x5f7a009664b771e889751f4fd721adc439033ecd'),
    address: normalizeAddress('0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1'),
    log: {
      address: '0xc537e898cd774e2dcba3b14ea6f34c93d5ea45e1',
      topics: [
        '0xff24554f8ccfe540435cfc8854831f8dcf1cf2068708cfaf46e8b52a4ccc4c8d',
        '0x0000000000000000000000005f7a009664b771e889751f4fd721adc439033ecd',
        '0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
      ],
      data: '0x00000000000000000000000000000003000000000000000000000000000000090000000000000000000000000000000000000000000000000000000000989680000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffdf41ad9fac0000000000000000000000000000000000000000000000000000000000989680000000000000000000000000000000000000000000000000000000000098968000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffdf394b3665',
      blockNumber: '0x104bfbe',
      transactionHash: '0x17cf2eee12a60d9ff7c779496c5ac92c42908d6b3c56c730dc6428b169fc27d8',
      transactionIndex: '0xc9',
      blockHash: '0xaf0e7f460ad35140f7ed5a585b4bd73371bf5215ee60f5b4982cd161b44cc9bd',
      logIndex: '0x1f8',
      removed: false,
    },
    adapter: new CarbonAdapter(CarbonConfigs, null),
    action: 'deposit',
  },
];