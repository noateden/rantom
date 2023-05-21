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
  'NameRegistered(string,bytes32,address,uint256,uint256,uint256)':
    '0x69e37f151eb98a09618ddaa80c8cfaf1ce5996867c489f45b555b412271ebf27',
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
  'TakerAsk((bytes32,uint256,bool),address,address,uint256,address,address,uint256[],uint256[],address[2],uint256[3])':
    '0x9aaa45d6db2ef74ead0751ea9113263d1dec1b50cea05f0ca2002cb8063564a4',
  'TakerBid((bytes32,uint256,bool),address,address,uint256,address,address,uint256[],uint256[],address[2],uint256[3])':
    '0x3ee3de4684413690dee6fff1a0a4f92916a1b97d1c5a83cdf24671844306b2e3',
  'RoyaltyPayment(address,uint256,address,address,uint256)':
    '0x27c4f0403323142b599832f26acd21c74a9e5b809f2215726e244a4ac588cd7d',
  'DepositEvent(bytes,bytes,bytes,bytes,bytes)': '0x649bbc62d0e31342afea4e5cd82d4049e7e1ee912fc0889aa790803be39038c5',
  'NewTransmission(uint32,int192,address,int192[],bytes,bytes32)':
    '0xf6a97944f31ea060dfde0566e4167c1a1082551e64b60ecb14d599a9d023d451',
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

  // gearbox
  'AddLiquidity(address,address,uint256,uint256)': '0xd2491a9b4fe81a7cd4511e8b7b7743951b061dad5bed7da8a7795b080ee08c7e',
  'RemoveLiquidity(address,address,uint256)': '0xd8ae9b9ba89e637bcb66a69ac91e8f688018e81d6f92c57e02226425c8efbdf6',
  'Repay(address,uint256,uint256,uint256)': '0x2fe77b1c99aca6b022b8efc6e3e8dd1b48b30748709339b65c50ef3263443e09',
  'Claimed(address,uint256,bool)': '0xfa8256f7c08bb01a03ea96f8b3a904a4450311c9725d1c52cdbe21ed3dc42dcc',

  // mSPELL staking
  'Deposit(address,uint256)': '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c',
  'Withdraw(address,uint256)': '0x884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364',
  'ClaimReward(address,uint256)': '0xba8de60c3403ec381d1d484652ea1980e3c3e56359195c92525bff4ce47ad98e',

  // rarible marketplace
  'Buy(address,uint256,uint256,address,address,uint256,uint256,address,uint256,uint256)':
    '0xdddcdb07e460849cf04a4445b7af9faf01b7f5c7ba75deaf969ac5ed830312c3',

  // exact.ly
  'Borrow(address,address,address,uint256,uint256)':
    '0x96558a334f4759f0e7c423d68c84721860bd8fbf94ddc4e55158ecb125ad04b5',
  'Repay(address,address,uint256,uint256)': '0xe4a1ae657f49cb1fb1c7d3a94ae6093565c4c8c0e03de488f79c377c3c3a24e0',
  'DepositAtMaturity(uint256,address,address,uint256,uint256)':
    '0xd9900507c64720c1a5e11858a42769b599616268b832495aa6afe8b9dc566e76',
  'WithdrawAtMaturity(uint256,address,address,address,uint256,uint256)':
    '0xe57dbac0e7c42ad5f3b0fadb9c065565377cf771054fca70d35c96e01f9ec53c',
  'BorrowAtMaturity(uint256,address,address,address,uint256,uint256)':
    '0x66866b472f27d55d69496091bbd651907b2fb1041b3eeaca6e565ae5b5af4013',
  'RepayAtMaturity(uint256,address,address,uint256,uint256)':
    '0xf17fce321dd9fb005136a80c0bfb3789e455b7a70be9eb8922f1ad20a80d1a33',
  'Liquidate(address,address,uint256,uint256,address,uint256)':
    '0x67bb48f97d82192848c24158abf58ec614777328e19655e0a219652b773fd1db',

  // frax eth
  'ETHSubmitted(address,address,uint256,uint256)': '0x29b3e86ecfd94a32218997c40b051e650e4fd8c97fc7a4d266be3f7c61c5205b',

  // carbondefi.xyz
  'TokensTraded(address,address,address,uint256,uint256,uint128,bool)':
    '0x95f3b01351225fea0e69a46f68b164c9dea10284f12cd4a907ce66510ab7af6a',
  'StrategyCreated(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))':
    '0xff24554f8ccfe540435cfc8854831f8dcf1cf2068708cfaf46e8b52a4ccc4c8d',
  'StrategyDeleted(uint256,address,address,address,(uint128,uint128,uint64,uint64),(uint128,uint128,uint64,uint64))':
    '0x4d5b6e0627ea711d8e9312b6ba56f50e0b51d41816fd6fd38643495ac81d38b6',

  // lido.fi
  'SubmitEvent(address,uint256,address)': '0x98d2bc018caf34c71a8f920d9d93d4ed62e9789506b74087b48570c17b28ed99',
  'ClaimTokensEvent(address,uint256,uint256,uint256)':
    '0xaca94a3466fab333b79851ab29b0715612740e4ae0d891ef8e9bd2a1bf5e24dd',
  'WithdrawalClaimed(uint256,address,address,uint256)':
    '0x6ad26c5e238e7d002799f9a5db07e81ef14e37386ae03496d7a7ef04713e145b',

  // stakewise
  'Claimed(address,uint256,address[],uint256[])': '0xc4687ac57d0a9636a21381dada24ff811c5652e7f9ee442caede1927ecebcb9b',

  // liquity.org
  'UserDepositChanged(address,uint256)': '0xbce78369dccab09eec1986f4d409ab09ffbb47d65423e5148fcf98411c5111c9',
  'ETHGainWithdrawn(address,uint256,uint256)': '0x51457222ebca92c335c9c86e2baa1cc0e40ffaa9084a51452980d5ba8dec2f63',
  'LQTYPaidToDepositor(address,uint256)': '0x2608b986a6ac0f6c629ca37018e80af5561e366252ae93602a96d3ab2e73e42d',

  // conic.finance
  'ClaimedRewards(uint256,uint256)': '0x141d6e75554381bcc1326596e8010e6c432bb0988e14ca0310d85837a211d292',
  'Locked(address,uint256,uint256,bool)': '0xca8d506eda84f8ed07c2908ae102299d34888ef5e19b97f56e4d6fcd1104c31e',
  'UnlockExecuted(address,uint256)': '0xb291e2a2847a5ad6d47409943306c6d6e8c63a9855b849701b868191e9478970',

  // kyberswap
  'Swapped(address,address,address,address,uint256,uint256)':
    '0xd6d4f5681c246c9f42c203e287975af1601f8df8035a9251f79aab5c8f09e2f8',
  'OrderFilled(address,bytes32,uint256,uint256,uint256)':
    '0xda67fd5efd7c65cc617b4e30cdd2569c6c2b3d0034729f3c616c6a83b4520a8f',
  'OrderFilledRFQ(address,bytes32,uint256,uint256)':
    '0xeb6e58fbaca6cb4b6726ec4e1ac663797ae31405c07620f4d6babd436ee9f0f7',
  'Swap(address,uint256,uint256,uint256,uint256,address,uint256)':
    '0x606ecd02b3e3b4778f8e97b2e03351de14224efaa5fa64e62200afc9395c2499',
  'PoolCreated(address,address,address,uint32,uint24,uint256)':
    '0xb6bce363b712c921bead4bcc977289440eb6172eb89e258e3a25bd49ca806de6',
  'PoolCreated(address,address,address,uint32,uint256)':
    '0xfc574402c445e75f2b79b67884ff9c662244dce454c5ae68935fcd0bebb7c8ff',

  // arrakis.finance
  'Minted(address,uint256,uint256,uint256,uint128)':
    '0x55801cfe493000b734571da1694b21e7f66b11e8ce9fdaa0524ecb59105e73e7',
  'Burned(address,uint256,uint256,uint256,uint128)':
    '0x7239dff1718b550db7f36cbf69c665cfeb56d0e96b4fb76a5cba712961b65509',
  'LogMint(address,uint256,uint256,uint256)': '0x5f11830295067c4bcc7d02d4e3b048cd7427be50a3aeb6afc9d3d559ee64bcfa',
  'LogBurn(address,uint256,uint256,uint256)': '0x86dacd5ce62967ebd3d915a82b22ad7e159538e50c7ba451e073fec048d9f127',

  // lybra.finance
  'DepositEther(address,address,uint256,uint256)': '0x819557bb6c528588eb5c050cf4dd54b96956b6f93a5232c6b429d19e95fe8e89',
  'WithdrawEther(address,address,uint256,uint256)':
    '0x7af7d9e5b71152303ff7a5221e1a22febc3cf6407ea2a05f870d770097177db0',
  'Mint(address,address,uint256,uint256)': '0x2f00e3cdd69a77be7ed215ec7b2a36784dd158f921fca79ac29deffa353fe6ee',
  'Burn(address,address,uint256,uint256)': '0x5d624aa9c148153ab3446c1b154f660ee7701e549fe9b62dab7171b1c80e6fa2',
  'LiquidationRecord(address,address,address,uint256,uint256,uint256,bool,uint256)':
    '0xb59dc9737d55b75fc6ca7522e82d6161da5d7c8337b9ab990a5846f95b5ccdad',

  // pendle.finance
  'Deposit(address,address,address,uint256,uint256)':
    '0x5fe47ed6d4225326d3303476197d782ded5a4e9c14f479dc9ec4992af4e85d59',
  'Redeem(address,address,address,uint256,uint256)':
    '0xaee47cdf925cf525fdae94f9777ee5a06cac37e1c41220d0a8a89ed154f62d1c',
  'ClaimRewards(address,address[],uint256[])': '0x2193aa20a3717f5f4ac79482f4f553e5f0afe8f4e6ec3e3d1aa2e138adc4763f',
  'Burn(address,address,uint256,uint256,uint256)': '0x4cf25bc1d991c17529c25213d3cc0cda295eeaad5f13f361969b12ea48015f90',
  'Swap(address,address,int256,int256,uint256,uint256)':
    '0x829000a5bc6a12d46e30cdcecd7c56b1efd88f6d7d059da6734a04f3764557c4',

  // binance staked eth
  'DepositEth(address,uint256,uint256,address)': '0xe32c4b34261b430739ef30d727d062f9fdd6410be2080e6fd875a6015f40de83',

  // Dodo Router
  'OrderHistory(address,address,address,uint256,uint256)':
    '0x92ceb067a9883c85aba061e46b9edf505a0d6e81927c4b966ebed543a5221787',

  // Curve veCRV
  'Deposit(address,uint256,uint256,int128,uint256)':
    '0x4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d59',

  // veYFI
  'ModifyLock(address,address,uint256,uint256,uint256)':
    '0x01affbd18fb24fa23763acc978a6bb9b9cd159b1cc733a15f3ea571d691cabc1',

  // Morpho Aave v2
  'Supplied(address,address,address,uint256,uint256,uint256)':
    '0x11adb3570ba55fd255b1f04252ca0071ae6639c86d4fd69e7c1bf1688afb493f',
  'Withdrawn(address,address,address,uint256,uint256,uint256)':
    '0x378f9d375cd79e36c19c26a9e57791fe7cd5953b61986c01ebf980c0efb92801',
  'Borrowed(address,address,uint256,uint256,uint256)':
    '0xc1cba78646fef030830d099fc25cb498953709c9d47d883848f81fd207174c9f',
  'Repaid(address,address,address,uint256,uint256,uint256)':
    '0x7b417e520d2b905fc5a1689d29d329358dd55efc60ed115aa165b0a2b64232c6',
  'Liquidated(address,address,address,uint256,address,uint256)':
    '0xc2c75a73164c2efcbb9f74bfa511cd0866489d90687831a7217b3dbeeb697088',
  // Morpho Aave v3
  'CollateralSupplied(address,address,address,uint256,uint256)':
    '0x4d1fc6dc36972a1eeab2351fae829d06c827d7ee429880dbf762ec00b805fb2f',
  'Borrowed(address,address,address,address,uint256,uint256,uint256)':
    '0xf99275e3db7a3400181f0bd088002bba02b833be9187bccc88fbbc79fb52f2f1',
  'Withdrawn(address,address,address,address,uint256,uint256,uint256)':
    '0x6a9c828ef646db99cc7a20bbfb02fdf8f7dcc183400a28daab4968e47b9a21e0',
  'CollateralWithdrawn(address,address,address,address,uint256,uint256)':
    '0xb49f4cffa4b6674963440a1fb6cb419c233a9341280f44d8543571eca1306577',

  // ankr ETH staking
  'StakeConfirmed(address,uint256)': '0x995d6cdbf356b73aa4dff24e951558cc155c9bb0397786ec4a142f9470f50007',
  'PendingUnstake(address,address,uint256,bool)': '0xc5130045b6f6c9e2944ccea448ad17c279db68237b8aa856ee12cbfaa25f7715',
  'RewardsDistributed(address[],uint256[])': '0xe69d325558610ba73c441901deb46d7f251108348dc5dc9447e8866774c12edc',
  'RewardsClaimed(address,address,uint256)': '0x9310ccfcb8de723f578a9e4282ea9f521f05ae40dc08f3068dfad528a65ee3c7',

  // DefiSaver
  'ActionDirectEvent(address,string,bytes)': '0xf28c1e8e1a8c97027796e625e1ed041028c9642e14da6e7ad2c18838a59a2d8c',
  'RecipeEvent(address,string)': '0xb6cd938f99beba85b61cc813aa1c12ba1b95f797dfb6ddd567c0f361f3e77574',

  // Paraswap v5
  'BoughtV3(bytes16,address,uint256,address,address,address,address,uint256,uint256,uint256)':
    '0x4cc7e95e48af62690313a0733e93308ac9a73326bc3c29f1788b1191c376d5b6',
  'SwappedV3(bytes16,address,uint256,address,address,address,address,uint256,uint256,uint256)':
    '0xe00361d207b252a464323eb23d45d42583e391f2031acdd2e9fa36efddd43cb0',

  // Compound comet reward
  'RewardClaimed(address,address,address,uint256)':
    '0x2422cac5e23c46c890fdcf42d0c64757409df6832174df639337558f09d99c68',

  // Airswap
  'Swap(uint256,uint256,address,address,uint256,uint256,address,address,uint256)':
    '0x06dfeb25e76d44e08965b639a9d9307df8e1c3dbe2a6364194895e9c3992f033',
};
