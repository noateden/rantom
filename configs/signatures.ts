export const Signatures: { [key: string]: string } = {
  'Transfer(address,address,uint256)': '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  'Submitted(address,uint256,address)': '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a',
  'Swap(address,uint256,uint256,uint256,uint256,address)':
    '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  'Mint(address,uint256,uint256)': '0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f',
  'Burn(address,uint256,uint256,address)': '0xdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496',
  'Swap(address,address,int256,int256,uint160,uint128,int24)':
    '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
  'Mint(address,address,int24,int24,uint128,uint256,uint256)':
    '0x7a53080ba414158be7ec69b987b5fb7d07dee101fe85488f0853ae16239d0bde',
  'Burn(address,int24,int24,uint128,uint256,uint256)':
    '0x0c396cd989a39f4459b5fa1aed6a9a8dcdbc45908acfd67e028cd568da98982c',
  'Collect(address,address,int24,int24,uint128,uint128)':
    '0x70935338e69775456a85ddef226c395fb668b63fa0115f5f20610b388e6ca9c0',
  'Swap(bytes32,address,address,uint256,uint256)': '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
  'FlashLoan(address,address,uint256,uint256)': '0x0d7d75e01ab95780d3cd1c8ec0dd6c2ce19e3a20427eec8bf53283b6fb8e95f0',
  'PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])':
    '0xe5ce249087ce04f05a957192435400fd97868dba0e6a4b4c049abf8af80dae78',
  'Deposit(address,address,uint256,uint16,uint256)':
    '0xc12c57b1c73a2c3a2ea4613e9476abb3d8d146857aab7329e24243fb59710c82',
  'RedeemUnderlying(address,address,uint256,uint256)':
    '0x9c4ed599cd8555b9c1e8cd7643240d7d71eb76b792948c49fcb4d411f7b6b3c6',
  'Borrow(address,address,uint256,uint256,uint256,uint256,uint256,uint16,uint256)':
    '0x1e77446728e5558aa1b7e81e0cdab9cc1b075ba893b740600c76a315c2caa553',
  'Repay(address,address,address,uint256,uint256,uint256,uint256)':
    '0xb718f0b14f03d8c3adf35b15e3da52421b042ac879e5a689011a8b1e0036773d',
  'FlashLoan(address,address,uint256,uint256,uint256,uint256)':
    '0x5b8f46461c1dd69fb968f1a003acee221ea3e19540e350233b612ddb43433b55',
  'Deposit(address,address,address,uint256,uint16)':
    '0xde6857219544bb5b7746f48ed30be6386fefc61b2f864cacf559893bf50fd951',
  'Withdraw(address,address,address,uint256)': '0x3115d1449a7b732c986cba18244e897a450f61e1bb8d589cd2e69e6c8924f9f7',
  'Borrow(address,address,address,uint256,uint256,uint256,uint16)':
    '0xc6a898309e823ee50bac64e45ca8adba6690e99e7841c45d754e2a38e9019d9b',
  'Repay(address,address,address,uint256)': '0x4cdde6e09bb755c9a5589ebaec640bbfedff1362d4b255ebf8339782b9942faa',
  'FlashLoan(address,address,address,uint256,uint256,uint16)':
    '0x631042c832b07452973831137f2d73e395028b44b250dedc5abb0ee766e168ac',
  'Supply(address,address,address,uint256,uint16)':
    '0x2b627736bca15cd5381dcf80b0bf11fd197d01a037c52b927a881a10fb73ba61',
  'Borrow(address,address,address,uint256,uint8,uint256,uint16)':
    '0xb3d084820fb1a9decffb176436bd02558d15fac9b0ddfed8c465bc7359d7dce0',
  'Repay(address,address,address,uint256,bool)': '0xa534c8dbe71f871f9f3530e97a74601fea17b426cae02e1c5aee42c96c784051',
  'FlashLoan(address,address,address,uint256,uint8,uint256,uint16)':
    '0xefefaba5e921573100900a3ad9cf29f222d995fb3b6045797eaea7521bd8d6f0',
  'Redeem(address,uint256,uint256)': '0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929',
  'Borrow(address,uint256,uint256,uint256)': '0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80',
  'RepayBorrow(address,address,uint256,uint256,uint256)':
    '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1',
  'LiquidateBorrow(address,address,uint256,address,uint256)':
    '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52',
  'LiquidationCall(address,address,address,uint256,uint256,uint256,address,bool,uint256)':
    '0x56864757fd5b1fc9f38f5f3a981cd8ae512ce41b902cf73fc506ee369c6bc237',
  'LiquidationCall(address,address,address,uint256,uint256,address,bool)':
    '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286',
  'Supply(address,address,uint)': '0xac6c0802d8d928235a39ae3ea13005d29082f0b74791e03f417418bb7f578f5f',
  'Withdraw(address,address,uint)': '0x4d120bbe462babe2ed9cf21623974e4044baad94ad9934364afeb94af19d54bb',
  'SupplyCollateral(address,address,address,uint)':
    '0x10357f491404d0565e9e4b4457694a4f0389284da3c4b1284aedd9033b92c270',
  'WithdrawCollateral(address,address,address,uint)':
    '0x22d4332f9e3a165c94107ee9c6805f4119587e0ab1164b17fcfd448b7aa4680b',
  'DistributedSupplierComp(address,address,uint256,uint256)':
    '0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a',
  'DistributedBorrowerComp(address,address,uint256,uint256)':
    '0x1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6',
  'Flashloan(address,uint256,uint256,uint256)': '0x33c8e097c526683cbdb29adf782fac95e9d0fbe0ed635c13d8c75fdf726557d9',
  'TokensMinted(address,uint256,uint256,uint256)': '0x6155cfd0fd028b0ca77e8495a60cbe563e8bce8611f0aad6fedbdaafc05d44a2',
  'TokensBurned(address,uint256,uint256,uint256)': '0x19783b34589160c168487dc7f9c51ae0bcefe67a47d6708fba90f6ce0366d3d1',
};
