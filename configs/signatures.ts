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
  'Deposit(address,uint256,uint256,address)': '0x02d7e648dd130fc184d383e55bb126ac4c9c60e8f94bf05acdf557ba2d540b47',
  'Withdraw(address,uint256,uint256,address)': '0x8166bf25f8a2b7ed3c85049207da4358d16edbed977d23fa2ee6f0dde3ec2132',
  'EmergencyWithdraw(address,uint256,uint256,address)':
    '0x2cac5e20e1541d836381527a43f651851e302817b71dc8e810284e69210c1c6b',
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
  'RemoveLiquidityOne(address,uint256,uint256)': '0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
  'RemoveLiquidityOne(address,uint256,uint256,uint256)':
    '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0',
  'RemoveLiquidity(address,uint256[4],uint256[4],uint256)':
    '0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
  'TokenExchangeUnderlying(address,int128,uint256,int128,uint256)':
    '0xd013ca23e77a65003c2c659c5442c00c805371b7fc1ebd4c206c41d1536bd90b',
  'AddLiquidity(address,uint256[4],uint256[4],uint256,uint256)':
    '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
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
  'Supply(address,address,uint256)': '0xd1cf3d156d5f8f0d50f6c122ed609cec09d35c9b9fb3fff6ea0959134dae424e',
  'Withdraw(address,address,uint256)': '0x9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb',
  'SupplyCollateral(address,address,address,uint256)':
    '0xfa56f7b24f17183d81894d3ac2ee654e3c26388d17a28dbd9549b8114304e1f4',
  'WithdrawCollateral(address,address,address,uint256)':
    '0xd6d480d5b3068db003533b170d67561494d72e3bf9fa40a266471351ebba9e16',
  'AbsorbCollateral(address,address,address,uint256,uint256)':
    '0x9850ab1af75177e4a9201c65a2cf7976d5d28e40ef63494b44366f86b2f9412e',
  'NameRegistered(string,bytes32,address,uint256,uint256)':
    '0xca6abbe9d7f11422cb6ca7629fbf6fe9efb1c621f71ce8f02b9f2a230097404f',
  'NameRenewed(string,bytes32,uint256,uint256)': '0x3da24c024582931cfaf8267d8ed24d13a82a8068d5bd337d30ec45cea4e506ae',
  'SequencerBatchAppended(uint256,uint256,uint256)':
    '0x602f1aeac0ca2e7a13e281a9ef0ad7838542712ce16780fa2ecffd351f05f899',
  'TransferSentToL2(uint256,address,uint256,uint256,uint256,address,uint256)':
    '0x0a0607688c86ec1775abcdbab7b33a3a35a6c9cde677c9be880150c231cc6b0b',
  'LogAnySwapIn(bytes32,address,address,uint256,uint256,uint256)':
    '0xaac9ce45fe3adf5143598c4f18a369591a20a3384aedaf1b525d29127e1fcd55',
  'LogAnySwapOut(address,address,address,uint256,uint256,uint256)':
    '0x97116cf6cd4f6412bb47914d6db18da9e16ab2142f543b86e207c24fbd16b23a',
  'AddDeposit(address,address,uint32,uint256,uint256)':
    '0xdbe49eaf5c2a8a7f65920c200ca5d47395540b884f6a1886fdb2611624f9981b',
  'AddWithdrawal(address,address,uint32,uint256)': '0xad946216d2715ed9b769178b59b5bd1b1ee3a1ef3adbe82f17d30617109e96f3',
  'RemoveWithdrawal(address,address,uint32,uint256)':
    '0xaa6a2412fe6f73e85c713779b0e5a0d7fe8c08cc03c3a7b397ef83a4c1dca538',
  'RemoveWithdrawals(address,address,uint32[],uint256)':
    '0x7c7b3f4a133861c092bfa3c8ba112156b88763da4e7ed69e50f617bc24c68c4e',
  'Harvest(address,uint256[],uint256)': '0x2250a3497055c8a54223a5ea64f100a209e9c1c4ab39d3cae64c64a493065fa1',
  'Sow(address,uint256,uint256,uint256)': '0xdd43b982e9a6350577cad86db14e254b658fb741d7864a6860409c4526bcc641',
  'TakerAsk(bytes32,uint256,address,address,address,address,address,uint256,uint256,uint256)':
    '0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330',
  'TakerBid(bytes32,uint256,address,address,address,address,address,uint256,uint256,uint256)':
    '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be',
  'RoyaltyPayment(address,uint256,address,address,uint256)':
    '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
  'DepositEvent(bytes,bytes,bytes,bytes,bytes)': '0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5',
  'NewTransmission(uint32,int192,address,int192[],bytes,bytes32)':
    '0xf6a97944f31ea060dfde0566e4167c1a1082551e64b60ecb14d599a9d023d451',
  'Swapped2(bytes16,address,uint256,address,address,address,address,uint256,uint256,uint256)':
    '0x974dd0442e0b8c00fdbaae504edea1412d63bc110294a98b3c61ddcd0e703aa8',
  'Deposit(bytes32,uint32,uint256)': '0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196',
  'Withdrawal(address,bytes32,address,uint256)': '0xe9e508bad6d4c3227e881ca19068f099da81b5164dd6d62b2eaf1e8bc6c34931',

  // Beanstalk marketplace
  'PodOrderCreated(address,bytes32,uint256,uint24,uint256,uint256,bytes,uint8)':
    '0x7279c7b5d64f6bb98758727f0f16bcc5cf260997bfb49a45234c28fcb55fbcf0',
  'PodOrderFilled(address,address,bytes32,uint256,uint256,uint256,uint256)':
    '0x525994627282299f72de05d7d3f543c6ec6c2022cb3898ad47ff18553c7655bf',
  'PodOrderCancelled(address,bytes32)': '0x531180eb4d1153cb99f00e54fef0a473edc9e3e951f9a88468fec65988e9e4f8',
  'PodListingCreated(address,uint256,uint256,uint256,uint24,uint256,uint256,bytes,uint8,uint8)':
    '0xb7653814153cbbed10e29f56c0ba102e97b4ce1078bbd8bd02da1ccce7d38fc9',
  'PodListingFilled(address,address,uint256,uint256,uint256,uint256)':
    '0xb33a5c3dd7c4265e5702ad84b5c4f6bb3971d2424a47955979a642fe9d77f4c3',
  'PodListingCancelled(address,uint256)': '0xe9dc43fcbeb08ecb743b537fa98567049e3b77e283833f89ab216b22ede6ba0a',

  // 0x: Exchange
  'TransformedERC20(address,address,address,uint256,uint256)':
    '0x0f6672f78a59ba8e5e5b5d38df3ebc67f3c792e2c9259b8d97d7f00dd78ba1b3',
  'OtcOrderFilled(bytes32,address,address,address,address,uint128,uint128)':
    '0xac75f773e3a92f1a02b12134d65e1f47f8a14eabe4eaf1e24624918e6a8b269f',
  'LimitOrderFilled(bytes32,address,address,address,address,address,uint128,uint128,uint128,uint256,bytes32)':
    '0xab614d2b738543c0ea21f56347cf696a3a0c42a7cbec3212a5ca22a4dcff2124',
  'RfqOrderFilled(bytes32,address,address,address,address,uint128,uint128,bytes32)':
    '0x829fa99d94dc4636925b38632e625736a614c154d55006b7ab6bea979c210c32',

  // Euler Finance
  'Deposit(address,address,uint256)': '0x5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f62',
  'Borrow(address,address,uint256)': '0x312a5e5e1079f5dda4e95dbbd0b908b291fd5b992ef22073643ab691572c5b52',
  'Repay(address,address,uint256)': '0x05f2eeda0e08e4b437f487c8d7d29b14537d15e3488170dc3de5dbdf8dac4684',
  'Liquidation(address,address,address,address,uint256,uint256,uint256,uint256,uint256)':
    '0xbba0f1d6fb8b9abe2bbc543b7c13d43faba91c6f78da4700381c94041ac7267d',

  'Harvest(address,uint256)': '0xc9695243a805adb74c91f28311176c65b417e842d5699893cef56d18bfa48cba',

  // liquity.org
  'TroveUpdated(address,uint256,uint256,uint256,uint8)':
    '0xc3770d654ed33aeea6bf11ac8ef05d02a6a04ed4686dd2f624d853bbec43cc8b',
  'TroveLiquidated(address,uint256,uint256,uint8)':
    '0xea67486ed7ebe3eea8ab3390efd4a3c8aae48be5bea27df104a8af786c408434',

  // abracadabra.money
  'LogAddCollateral(address,address,uint256)': '0x9ed03113de523cebfe5e49d5f8e12894b1c0d42ce805990461726444c90eab87',
  'LogRemoveCollateral(address,address,uint256)': '0x8ad4d3ff00da092c7ad9a573ea4f5f6a3dffc6712dc06d3f78f49b862297c402',
  'LogBorrow(address,address,uint256,uint256)': '0xb92cb6bca8e3270b9170930f03b17571e55791acdb1a0e9f339eec88bdb35e24',
  'LogRepay(address,address,uint256,uint256)': '0xc8e512d8f188ca059984b5853d2bf653da902696b8512785b182b2c813789a6e',
  'LogLiquidation(address,address,address,uint256,uint256,uint256)':
    '0x66b108dc29b952efc76dccea9b82dce6b59fab4d9af73d8dcc9789afcad5daf6',

  // maker
  'Join(address,uint256,address)': '0x16c03c2fe01ac285473b0d10ba5c5de59ede582fcac27a866b5827415fe44b03',
  'Exit(address,uint256)': '0x22d324652c93739755cf4581508b60875ebdd78c20c0cff5cf8e23452b299631',

  // stargate
  'Mint(address,uint256,uint256,uint256)': '0xb4c03061fb5b7fed76389d5af8f2e0ddb09f8c70d1333abbb62582835e10accb',
  'Burn(address,uint256,uint256)': '0x49995e5dd6158cf69ad3e9777c46755a1a826a446c6416992167462dad033b2a',
  'Swap(uint16,uint256,address,uint256,uint256,uint256,uint256,uint256)':
    '0x34660fc8af304464529f48a778e03d03e4d34bcd5f9b6f0cfbf3cd238c642f7f',
  'SwapRemote(address,uint256,uint256,uint256)': '0xfb2b592367452f1c437675bed47f5e1e6c25188c17d7ba01a12eb030bc41ccef',

  // silo.finance
  'Deposit(address,address,uint256,bool)': '0xdd160bb401ec5b5e5ca443d41e8e7182f3fe72d70a04b9c0ba844483d212bcb5',
  'Withdraw(address,address,address,uint256,bool)':
    '0x3b5f15635b488fe265654176726b3222080f3d6500a562f4664233b3ea2f0283',
  'Liquidate(address,address,uint256,uint256)': '0xf3fa0eaee8f258c23b013654df25d1527f98a5c7ccd5e951dd77caca400ef972',

  // bancor
  'Conversion(address,address,address,uint256,uint256,address)':
    '0x7154b38b5dd31bb3122436a96d4e09aba5b323ae1fd580025fab55074334c095',
  'TokensDeposited(bytes32,address,uint256,uint256,uint256)':
    '0x98ac1ba20f9c40c6579f93634a34a46bd425744a5ef297e4c739ba0ce1d7f6b5',
  'TokensWithdrawn(bytes32,address,uint256,uint256,uint256,uint256)':
    '0x2d3e6c9d7b23425696e79d70b11c80ff35e7e65291f79a03f9aef35570686351',

  // pancakeswap v3
  'Swap(address,address,int256,int256,uint160,uint128,int24,uint128,uint128)':
    '0x19b47279256b2a23a1665c810c8d55a1758940ee09377d4f8d26497a3577dc83',
  'Mint(address,address,int24,int24,uint128,uint256,uint256,uint256)':
    '0xa1568462f02893b080aff063ff02808f3e3b9c0339a5aa2e7e48f4009969bca3',

  // factory
  'PairCreated(address,address,address,uint256)': '0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9',
  'PoolCreated(address,address,uint24,int24,address)':
    '0x783cca1c0412dd0d695e784568c96da2e9c22ff989357a2e8b1d9b2b4e6b7118',

  // beefy.finance
  'Staked(address,uint256)': '0x9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d',
  'Withdrawn(address,uint256)': '0x7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d5',

  // fraxlend
  'Deposit(address,address,uint256,uint256)': '0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7',
  'Withdraw(address,address,address,uint256,uint256)':
    '0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db',
  'BorrowAsset(address,address,uint256,uint256)': '0x01348584ec81ac7acd52b7d66d9ade986dd909f3d513881c190fc31c90527efe',
  'AddCollateral(address,address,uint256)': '0xa32435755c235de2976ed44a75a2f85cb01faf0c894f639fe0c32bb9455fea8f',
  'RemoveCollateral(address,uint256,address,address)':
    '0xbc290bb45104f73cf92115c9603987c3f8fd30c182a13603d8cffa49b5f59952',
  'RepayAsset(address,address,uint256,uint256)': '0x9dc1449a0ff0c152e18e8289d865b47acc6e1b76b1ecb239c13d6ee22a9206a7',
  'Liquidate(address,uint256,uint256,uint256,uint256,uint256)':
    '0x35f432a64bd3767447a456650432406c6cacb885819947a202216eeea6820ecf',

  // apecoin
  'Deposit(address,uint256,address)': '0xe31c7b8d08ee7db0afa68782e1028ef92305caeea8626633ad44d413e30f6b2f',
  'DepositNft(address,uint256,uint256,uint256)': '0x8863bdbe28273fa04cbc67c9e51785cff607a419b43ee367e4c3c01edb1d7b56',
  'Withdraw(address,uint256,address)': '0x56c54ba9bd38d8fd62012e42c7ee564519b09763c426d331b3661b537ead19b2',
  'WithdrawNft(address,uint256,uint256,address,uint256)':
    '0x46916533b23d6665275e4143ec7eeb4b6b4ae92178ebbfe99f112564d2c7b1aa',
  'ClaimRewards(address,uint256,address)': '0x030f754a3e747235920c21afeca14e881b260d41c7e657ada6c0b049f7eebca9',
  'ClaimRewardsNft(address,uint256,uint256,uint256)':
    '0xd334b3114fc25cbd72389ff9c361d5f8b0924e35fa237c65ac209a2cdcf4ba13',
};
