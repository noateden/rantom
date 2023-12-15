import { EventMapping } from '../../../types/configs';

export const BancorEventSignatures = {
  TokensTraded: '0x5c02c2bb2d1d082317eb23916ca27b3e7c294398b60061a2ad54f1c3c018c318',
  TokensDeposited: '0xecb7e4cd1580472adaeba712b36acf94439b2e1760af55fedb61960ca4422af3',
  TokensWithdrawn: '0xeab8ac9e9478a4b3c37a794ecef629b8a8bbcd96f9eaeac8ed26054d144da52d',
  FlashLoanCompleted: '0x0da3485ef1bb570df7bb888887eae5aa01d81b83cd8ccc80c0ea0922a677ecef',

  BNTPoolTokensDeposited: '0x98ac1ba20f9c40c6579f93634a34a46bd425744a5ef297e4c739ba0ce1d7f6b5',
  BNTPoolTokensWithdrawn: '0x2d3e6c9d7b23425696e79d70b11c80ff35e7e65291f79a03f9aef35570686351',
};

export const BancorAbiMappings: { [key: string]: EventMapping } = {
  [BancorEventSignatures.TokensTraded]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'sourceToken',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'targetToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sourceAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetFeeAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntFeeAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'trader',
        type: 'address',
      },
    ],
  },
  [BancorEventSignatures.TokensDeposited]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
    ],
  },
  [BancorEventSignatures.TokensWithdrawn]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'externalProtectionBaseTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawalFeeAmount',
        type: 'uint256',
      },
    ],
  },
  [BancorEventSignatures.FlashLoanCompleted]: {
    abi: [
      {
        indexed: true,
        internalType: 'contract Token',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'borrower',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'feeAmount',
        type: 'uint256',
      },
    ],
  },

  // BNT Pool
  [BancorEventSignatures.BNTPoolTokensDeposited]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'vbntAmount',
        type: 'uint256',
      },
    ],
  },
  [BancorEventSignatures.BNTPoolTokensWithdrawn]: {
    abi: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'contextId',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'bntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'poolTokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'vbntAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'withdrawalFeeAmount',
        type: 'uint256',
      },
    ],
  },
};
