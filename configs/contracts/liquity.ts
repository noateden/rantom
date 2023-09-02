import { Contract } from '../../types/configs';

export const LiquityContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'liquity',
    abi: {},
    address: '0x24179cd81c9e782a4096035f7ec97fb8b783e007',
    birthday: 12178582,
    events: [],
    topics: [
      '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b', // TroveUpdated
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'liquity',
    abi: {},
    address: '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2',
    birthday: 12178557,
    events: [],
    topics: [
      '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b', // TroveUpdated
      '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434', // TroveLiquidated
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'liquity',
    abi: {},
    address: '0x66017d22b0f8556afdd19fc67041899eb65a21bb',
    birthday: 12178565,
    events: [],
    topics: [
      '0xbce78369dccab09eec1986f4d409ab09ffbb47d65423e5148fcf98411c5111c9', // UserDepositChanged
      '0x51457222ebca92c335c9c86e2baa1cc0e40ffaa9084a51452980d5ba8dec2f63', // ETHGainWithdrawn
      '0x2608b986a6ac0f6c629ca37018e80af5561e366252ae93602a96d3ab2e73e42d', // LQTYPaidToDepositor
      '0xcd2cdc1a4af71051394e9c6facd9a266b2ac5bd65d219a701eeda009f47682bf', // LQTYPaidToFrontEnd
    ],
  },
];
