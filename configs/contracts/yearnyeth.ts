import { Contract } from '../../types/configs';

export const YearnyethContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'yearnyeth',
    abi: {},
    address: '0x2cced4ffa804adbe1269cdfc22d7904471abde63',
    birthday: 18074804,
    events: [],
    topics: [
      '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b', // Swap
      '0x67902069e86c21d5ad116d9df073bf02a2bfdbd591414157cda22d3b8476cd53', // AddLiquidity
      '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6', // RemoveLiquidity
      '0x7a3728879285f3ca5108b5f39698f28002a6b72cac81653343b8a7dfb75037f1', // RemoveLiquiditySingle
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'yearnyeth',
    abi: {},
    address: '0x583019ff0f430721ada9cfb4fac8f06ca104d0b4',
    birthday: 17815723,
    events: [],
    topics: [
      '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7', // Deposit
      '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db', // Withdraw
    ],
  },
];
