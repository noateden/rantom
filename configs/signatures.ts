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
  'Deposit(address,uint256,uint256)': '0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15',
  'Withdraw(address,uint256,uint256)': '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568',
  'EmergencyWithdraw(address,uint256,uint256)': '0xbb757047c2b5f3974fe26b7c10f732e7bce710b0952a71082702781e62ae0595',
  'TokenExchange(address,int128,uint256,int128,uint256)':
    '0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140',
  'AddLiquidity(address,uint256[3],uint256[3],uint256,uint256)':
    '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
  'RemoveLiquidity(address,uint256[3],uint256[3],uint256)':
    '0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
  'RemoveLiquidityImbalance(address,uint256[3],uint256[3],uint256,uint256)':
    '0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',
  'TokenExchange(address,uint256,uint256,uint256,uint256)':
    '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
  'AddLiquidity(address,uint256[3],uint256,uint256)':
    '0x96b486485420b963edd3fdec0b0195730035600feb7de6f544383d7950fa97ee',
  'RemoveLiquidity(address,uint256[3],uint256)': '0xd6cc314a0b1e3b2579f8e64248e82434072e8271290eef8ad0886709304195f5',
  'AddLiquidity(address,uint256[2],uint256[2],uint256,uint256)':
    '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
  'RemoveLiquidity(address,uint256[2],uint256[2],uint256)':
    '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
  'RemoveLiquidityImbalance(address,uint256[2],uint256[2],uint256,uint256)':
    '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
  'AddLiquidity(address,uint256[2],uint256,uint256)':
    '0x540ab385f9b5d450a27404172caade516b3ba3f4be88239ac56a2ad1de2a1f5a',
  'RemoveLiquidity(address,uint256[2],uint256)': '0xdd3c0336a16f1b64f172b7bb0dad5b2b3c7c76f91e8c4aafd6aae60dce800153',
  'Trade(address,address,address,uint256,uint256,uint256,bytes)':
    '0xa07a543ab8a018198e99ca0184c93fe9050a79400a0a723441f84de1d972cc17',
  'DepositRequested(address,address,address,uint16,uint96)':
    '0x73ff7b101bcdc22f199e8e1dd9893170a683d6897be4f1086ca05705abb886ae',
  'WithdrawalCompleted(uint8,address,address,address,uint256)':
    '0x0d22d7344fc6871a839149fd89f9fd88a6c29cf797a67114772a9d4df5f8c96b',
  'TokensTraded(bytes32,address,address,uint256,uint256,uint256,uint256,uint256,address)':
    '0x5c02c2bb2d1d082317eb23916ca27b3e7c294398b60061a2ad54f1c3c018c318',
  'TokensDeposited(bytes32,address,address,uint256,uint256)':
    '0xecb7e4cd1580472adaeba712b36acf94439b2e1760af55fedb61960ca4422af3',
  'TokensWithdrawn(bytes32,address,address,uint256,uint256,uint256,uint256,uint256)':
    '0xeab8ac9e9478a4b3c37a794ecef629b8a8bbcd96f9eaeac8ed26054d144da52d',
  'FlashLoanCompleted(address,address,uint256,uint256)':
    '0x0da3485ef1bb570df7bb888887eae5aa01d81b83cd8ccc80c0ea0922a677ecef',
  'Deposited(address,uint256,uint256)': '0x73a19dd210f1a7f902193214c0ee91dd35ee5b4d920cba8d519eca65a7b488ca',
  'Withdrawn(address,uint256,uint256)': '0x92ccf450a286a957af52509bc1c9939d1a6a481783e142e41e2499f0bb66ebc6',
  'RewardPaid(address,uint256)': '0xe2403640ba68fed3a2f88b7557551d1993f84b99bb10ff833f0cf8db0c5e0486',
};
