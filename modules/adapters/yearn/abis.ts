import { EventMapping } from '../../../types/configs';

export const YearnEventSignatures = {
  Swap: '0xb3e2773606abfd36b5bd91394b3a54d1398336c65005baf7bf7a05efeffaf75b',
  AddLiquidity: '0x67902069e86c21d5ad116d9df073bf02a2bfdbd591414157cda22d3b8476cd53',
  RemoveLiquidity: '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
  RemoveLiquiditySingle: '0x7a3728879285f3ca5108b5f39698f28002a6b72cac81653343b8a7dfb75037f1',

  // yETH staking
  Deposit: '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  Withdraw: '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',

  // veYFI
  veYFIModifyLock: '0x01affbd18fb24fa23763acc978a6bb9b9cd159b1cc733a15f3ea571d691cabc1',
  veYFIWithdraw: '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
};

export const YearnAbiMappings: { [key: string]: EventMapping } = {
  [YearnEventSignatures.veYFIModifyLock]: {
    abi: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'locktime',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ts',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [YearnEventSignatures.veYFIWithdraw]: {
    abi: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'ts',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
};

export const YearnyethAbiMappings: { [key: string]: EventMapping } = {
  [YearnEventSignatures.Swap]: {
    abi: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: false,
      },
      {
        name: 'asset_in',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'asset_out',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount_in',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount_out',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [YearnEventSignatures.AddLiquidity]: {
    abi: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amounts_in',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'lp_amount',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [YearnEventSignatures.RemoveLiquidity]: {
    abi: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'lp_amount',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [YearnEventSignatures.RemoveLiquiditySingle]: {
    abi: [
      {
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'asset',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'amount_out',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lp_amount',
        type: 'uint256',
        indexed: false,
      },
    ],
  },

  [YearnEventSignatures.Deposit]: {
    abi: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
  [YearnEventSignatures.Withdraw]: {
    abi: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assets',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'shares',
        type: 'uint256',
        indexed: false,
      },
    ],
  },
};
