export interface DefisaverAction {
  actionName: string;
  actionId: string;
  params: Array<string>;
}

export const DefisaverActions: { [key: string]: DefisaverAction } = {
  ///
  /// Aave
  ///
  AaveSupply: {
    actionName: 'AaveSupply',
    actionId: '0xc380343c',
    params: ['address', 'address', 'uint256', 'address', 'address', 'bool'],
  },
  AaveWithdraw: {
    actionName: 'AaveWithdraw',
    actionId: '0x4a76aaa3',
    params: ['address', 'address', 'uint256', 'address'],
  },
  AaveBorrow: {
    actionName: 'AaveBorrow',
    actionId: '0x5faaad42',
    params: ['address', 'address', 'uint256', 'uint256', 'address', 'address'],
  },
  AavePayback: {
    actionName: 'AavePayback',
    actionId: '0x9ca7f8d2',
    params: ['address', 'address', 'uint256', 'uint256', 'address', 'address'],
  },
  Aavev3Supply: {
    actionName: 'Aavev3Supply',
    actionId: '0xfc33bf00',
    params: ['uint256', 'address', 'uint16', 'bool', 'bool', 'bool', 'address', 'address'],
  },
  Aavev3Withdraw: {
    actionName: 'Aavev3Withdraw',
    actionId: '0x72a6498a',
    params: ['uint16', 'bool', 'uint256', 'address', 'address'],
  },
  Aavev3Borrow: {
    actionName: 'Aavev3Borrow',
    actionId: '0x9e9290b1',
    params: ['uint256', 'address', 'uint8', 'uint16', 'bool', 'bool', 'address', 'address'],
  },
  Aavev3Payback: {
    actionName: 'Aavev3Payback',
    actionId: '0x17683e81',
    params: ['uint256', 'address', 'uint8', 'uint16', 'bool', 'bool', 'address', 'address'],
  },

  ///
  /// Liquity
  ///
  LiquitySupply: {
    actionName: 'LiquitySupply',
    actionId: '0x7fe3a181',
    params: ['uint256', 'address', 'address', 'address'],
  },
  LiquityWithdraw: {
    actionName: 'LiquityWithdraw',
    actionId: '0xeb0c03cd',
    params: ['uint256', 'address', 'address', 'address'],
  },
  LiquityBorrow: {
    actionName: 'LiquityBorrow',
    actionId: '0x1b4a4a55',
    params: ['uint256', 'uint256', 'address', 'address', 'address'],
  },
  LiquityPayback: {
    actionName: 'LiquityPayback',
    actionId: '0x0761723e',
    params: ['uint256', 'address', 'address', 'address'],
  },
  LiquityOpen: {
    actionName: 'LiquityOpen',
    actionId: '0x9784ddef',
    params: ['uint256', 'uint256', 'uint256', 'address', 'address', 'address', 'address'],
  },
};
