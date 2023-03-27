import { AbracadabraConfigs } from '../../../configs/protocols';
import { normalizeAddress } from '../../../lib/helper';
import { AbracadabraAdapter } from '../../../modules/adapters/abracadabra/abracadabra';
import { TestLog } from '../../types';

export const AbracadabraActionTestLogs: Array<TestLog> = [
  {
    chain: 'ethereum',
    hash: '0x2ec40aeb714cd03ebc91dfe8b435f4ccf5136f5b0cf32ec083428c643e04dd42',
    sender: normalizeAddress('0x6abbf31304371b64ad96652c4dfdbae989656ddf'),
    address: normalizeAddress('0x390db10e65b5ab920c19149c919d970ad9d18a41'),
    log: {
      address: '0x390db10e65b5ab920c19149c919d970ad9d18a41',
      topics: [
        '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87',
        '0x0000000000000000000000006abbf31304371b64ad96652c4dfdbae989656ddf',
        '0x0000000000000000000000006abbf31304371b64ad96652c4dfdbae989656ddf',
      ],
      data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
      blockNumber: '0xfe4240',
      transactionHash: '0x2ec40aeb714cd03ebc91dfe8b435f4ccf5136f5b0cf32ec083428c643e04dd42',
      transactionIndex: '0x78',
      blockHash: '0x156491d3ce21dc4adf56e89353d397b87bc74fd9e3d1b1d301b93851ddbf4722',
      logIndex: '0xf6',
      removed: false,
    },
    adapter: new AbracadabraAdapter(AbracadabraConfigs, null),
    action: 'deposit',
  },
  {
    chain: 'ethereum',
    hash: '0x43cdab23ae2f0294cce47a17551b47f5491a52269c3e9d9b2c35c43b1dd65bc2',
    sender: normalizeAddress('0x6879e35146902627134293dce43e8bd83d22ad87'),
    address: normalizeAddress('0x390db10e65b5ab920c19149c919d970ad9d18a41'),
    log: {
      address: '0x390db10e65b5ab920c19149c919d970ad9d18a41',
      topics: [
        '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402',
        '0x0000000000000000000000006879e35146902627134293dce43e8bd83d22ad87',
        '0x0000000000000000000000006879e35146902627134293dce43e8bd83d22ad87',
      ],
      data: '0x0000000000000000000000000000000000000000000000000d93e2a6ce698d29',
      blockNumber: '0x101cef2',
      transactionHash: '0x43cdab23ae2f0294cce47a17551b47f5491a52269c3e9d9b2c35c43b1dd65bc2',
      transactionIndex: '0x52',
      blockHash: '0x7e77a4f095819c01b622181e7007f3c52fe7ebf50b3c5d6f8c9b263f4f7060c9',
      logIndex: '0xc9',
      removed: false,
    },
    adapter: new AbracadabraAdapter(AbracadabraConfigs, null),
    action: 'withdraw',
  },
  {
    chain: 'ethereum',
    hash: '0x42bf0a0e79aaed51adb32a9255adea4d6c9e6a19e419d3606e5259d5487e4b74',
    sender: normalizeAddress('0x3c1cb7d4c0ce0dc72edc7ea06acc866e62a8f1d8'),
    address: normalizeAddress('0x390db10e65b5ab920c19149c919d970ad9d18a41'),
    log: {
      address: '0x390db10e65b5ab920c19149c919d970ad9d18a41',
      topics: [
        '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24',
        '0x0000000000000000000000003c1cb7d4c0ce0dc72edc7ea06acc866e62a8f1d8',
        '0x0000000000000000000000003c1cb7d4c0ce0dc72edc7ea06acc866e62a8f1d8',
      ],
      data: '0x00000000000000000000000000000000000000000000000000e7f3e34a955daa00000000000000000000000000000000000000000000000000e7f3e34a955daa',
      blockNumber: '0xf12a24',
      transactionHash: '0x42bf0a0e79aaed51adb32a9255adea4d6c9e6a19e419d3606e5259d5487e4b74',
      transactionIndex: '0x3e',
      blockHash: '0xcfdd6b8d32c52d36364b085d3389a8baaeb7fd0bc2baca80087c028b806c7207',
      logIndex: '0x112',
      removed: false,
    },
    adapter: new AbracadabraAdapter(AbracadabraConfigs, null),
    action: 'borrow',
  },
  {
    chain: 'ethereum',
    hash: '0x0fb67797258610a1bfac8220a580028fe45473281714044b6503c8f008a5178b',
    sender: normalizeAddress('0xb5c327ef90ec4ed329321d0f5f30294289b94560'),
    address: normalizeAddress('0x390db10e65b5ab920c19149c919d970ad9d18a41'),
    log: {
      address: '0x390db10e65b5ab920c19149c919d970ad9d18a41',
      topics: [
        '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e',
        '0x000000000000000000000000b5c327ef90ec4ed329321d0f5f30294289b94560',
        '0x000000000000000000000000b5c327ef90ec4ed329321d0f5f30294289b94560',
      ],
      data: '0x0000000000000000000000000000000000000000000000dc6572fbd9216ed74f0000000000000000000000000000000000000000000000dc6572fbd9216ed74f',
      blockNumber: '0x100e317',
      transactionHash: '0x0fb67797258610a1bfac8220a580028fe45473281714044b6503c8f008a5178b',
      transactionIndex: '0x63',
      blockHash: '0x06ba0ebb921f86496a2337d0fd01c723570f5178092c20c944c04de5f90abb25',
      logIndex: '0xee',
      removed: false,
    },
    adapter: new AbracadabraAdapter(AbracadabraConfigs, null),
    action: 'repay',
  },
  {
    chain: 'ethereum',
    hash: '0x5ac004620b5acfc6a9db4ffcab70a23b3652c12846d42c09acf5f3e7d693b0d7',
    sender: normalizeAddress('0xe0d6b751ab1b28098d581d1f2265e76e16a3f10e'),
    address: normalizeAddress('0xd31e19a0574dbf09310c3b06f3416661b4dc7324'),
    log: {
      address: '0xd31e19a0574dbf09310c3b06f3416661b4dc7324',
      topics: [
        '0x66b108dc29b952efc76dccea9b82dce6b59fab4d9af73d8dcc9789afcad5daf6',
        '0x000000000000000000000000e0d6b751ab1b28098d581d1f2265e76e16a3f10e',
        '0x0000000000000000000000000bcd590a7bc197eab00bc00c19035d89bf8b0d9f',
        '0x000000000000000000000000e0d6b751ab1b28098d581d1f2265e76e16a3f10e',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000173a2e09900000000000000000000000000000000000000000000013aa56204785eef1b0800000000000000000000000000000000000000000000013971b94a000830f6c7',
      blockNumber: '0x10067b5',
      transactionHash: '0x5ac004620b5acfc6a9db4ffcab70a23b3652c12846d42c09acf5f3e7d693b0d7',
      transactionIndex: '0x8a',
      blockHash: '0xc06537a1ec6dd8d3b29f5596bcd537ff53edbc2d8aa6d9e03490b6825e4b8408',
      logIndex: '0xd7',
      removed: false,
    },
    adapter: new AbracadabraAdapter(AbracadabraConfigs, null),
    action: 'liquidate',
  },
];
