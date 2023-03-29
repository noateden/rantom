import { Contract } from '../../types/configs';
import MakerDaiFlashLoanAbi from '../abi/maker/DaiFlashloan.json';

export const MakerContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: MakerDaiFlashLoanAbi,
    address: '0x60744434d6339a6b27d73d9eda62b6f66a0a04fa',
    birthday: 16308190,
    events: ['FlashLoan'],
  },

  // Dai Join
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0x9759a6ac90977b93b58547b4a71c78317f391a28',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },

  // Gems
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0x2f0b23f53734252bda2277357e97e1517d6b042a',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0x08638eF1A205bE6762A8b935F5da9b700Cf7322c',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0xa191e578a6736167326d05c119ce0c90849e84b7',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0x2600004fd1585f7270756ddc88ad9cfa10dd0428',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0x0ac6a1d74e84c2df9063bddc31699ff2a2bb22a2',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'maker',
    abi: {},
    address: '0xfa8c996e158b80d77fbd0082bb437556a65b96e0',
    birthday: 16308190,
    events: [],
    topics: [
      '0xef693bed00000000000000000000000000000000000000000000000000000000',
      '0x3b4da69f00000000000000000000000000000000000000000000000000000000',
    ],
  },
];
