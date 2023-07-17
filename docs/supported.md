# Supported Protocols, Chains, Events, Topics

## Status

- 🌱: Complete on live
- 🔨: Working in progress

## DeFi Protocols

| Protocol             | Event                                                                                                                | Status |
| :------------------- | -------------------------------------------------------------------------------------------------------------------- | -----: |
| Uniswap v2           | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Pancakeswap          | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Shibaswap            | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Fraxswap             | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Sushi Dex            | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Sushi Masterchef     | Deposit, Withdraw, EmergencyWithdraw                                                                                 |     🌱 |
| Uniswap v3           | Mint, Swap, Burn, Collect                                                                                            |     🌱 |
| Balancer             | Swap, Join, Exit, FlashLoan                                                                                          |     🌱 |
| Aave v1              | Deposit, Withdraw, Borrow, Repay, Flashloan, Liquidation                                                             |     🌱 |
| Aave v2              | Supply, Withdraw, Borrow, Repay, Flashloan, Liquidation                                                              |     🌱 |
| Aave v3              | Supply, Withdraw, Borrow, Repay, Flashloan, Liquidation                                                              |     🌱 |
| Compound             | Mint, Redeem, Borrow, Repay, Liquidation, DistributedSupplierComp, DistributedBorrowerComp                           |     🌱 |
| IronBank             |                                                                                                                      |     🌱 |
| Compound v3          | Supply, Withdraw, SupplyCollateral, WithdrawCollateral, AbsorbCollateral, RewardClaimed                              |     🌱 |
| Convex Finance       | Deposited, Withdrawn, Staked, Withdrawn, RewardPaid                                                                  |     🌱 |
| Aura Finance         | Deposited, Withdrawn, Staked, Withdrawn, RewardPaid                                                                  |     🌱 |
| Bancor               | Deposit, Withdraw, Trade, Flashloan                                                                                  |     🌱 |
| Beanstalk            | Deposit, Withdraw, Sow                                                                                               |     🌱 |
| CowSwap Protocol     | Trade                                                                                                                |     🌱 |
| Curve                | TokenExchange, AddLiquidity, RemoveLiquidity                                                                         |     🌱 |
| Hop Exchange         | TransferToL2                                                                                                         |     🌱 |
| Lido                 | Submitted, SubmitEvent, ClaimTokensEvent, WithdrawalClaimed                                                          |     🌱 |
| Rocket Pool          | TokensMinted, TokensBurned                                                                                           |     🌱 |
| Multichain           | SwapIn, SwapOut                                                                                                      |     🌱 |
| Optimism             | Batch                                                                                                                |     🌱 |
| Eth2 Staking         | DepositEvent                                                                                                         |     🌱 |
| Chainlink            | NewTransmission                                                                                                      |     🌱 |
| Yearn                | Deposit, Withdraw                                                                                                    |     🌱 |
| 0x: Exchange         | TransformedERC20, OtcOrderFilled, LimitOrderFilled, RfqOrderFilled                                                   |     🌱 |
| Euler Finance        | Deposit, Withdraw, Borrow, Repay, Liquidation                                                                        |     🌱 |
| Liquity              | TroveUpdated, TroveLiquidated, UserDepositChanged, ETHGainWithdrawn, LQTYPaidToDepositor                             |     🌱 |
| Abracadabra          | LogBorrow, LogRepay, LogAddCollateral, LogRemoveCollateral, LogLiquidation, Transfer, Deposit, Withdraw, ClaimReward |     🌱 |
| MakerDao             | GemJoin, GemExit, DaiJoin, DaiExit, FlashLoan                                                                        |     🌱 |
| Stargate             | Mint, Burn, Swap, SwapRemote                                                                                         |     🌱 |
| Silo Finance         | Deposit, Withdraw, Borrow, Repay, Liquidate                                                                          |     🌱 |
| Beefy                | Transfer, Staked, Withdrawn, RewardPaid                                                                              |     🌱 |
| Fraxlend             | Deposit, Withdraw, AddCollateral, RemoveCollateral, BorrowAsset, RepayAsset, Liquidate                               |     🌱 |
| Apecoin              | Deposit, DepositNft, Withdraw, WithdrawNft, ClaimRewards, ClaimRewardsNft                                            |     🌱 |
| Gearbox              | AddLiquidity, RemoveLiquidity, Borrow, Repay, Claimed                                                                |     🌱 |
| Exactly              | Deposit, Withdraw, Borrow, Repay, DepositAtMaturity, WithdrawAtMaturity, BorrowAtMaturity, RepayAtMaturity           |     🌱 |
| FraxEth              | ETHSubmitted, Deposit, Withdraw                                                                                      |     🌱 |
| Carbon               | TokensTraded, StrategyCreated, StrategyDeleted                                                                       |     🌱 |
| Stakewise            | Transfer, Claimed                                                                                                    |     🌱 |
| Conic                | Deposit, Withdraw, ClaimedRewards, Locked, UnlockExecuted                                                            |     🌱 |
| Kyberswap Aggregator | Swapped                                                                                                              |     🌱 |
| Kyberswap Classic    | Mint, Swap, Burn, PoolCreated                                                                                        |     🌱 |
| Arrakis Finance      | Minted, Burned, LogMint, LogBurn                                                                                     |     🌱 |
| Lybra Finance        | DepositEther, WithdrawEther, Mint, Burn                                                                              |     🌱 |
| Pendle Finance       | Deposit, Redeem, ClaimRewards, Mint, Burn, Swap                                                                      |     🌱 |
| Binance Staked ETH   | DepositEth                                                                                                           |     🌱 |
| Agility LSD          | Staked, Withdrawn, RewardPaid                                                                                        |     🌱 |
| Dodoex               | OrderHistory                                                                                                         |     🌱 |
| Morpho               | Supplied, Withdrawn, Borrowed, Repaid, Liquidated, CollateralSupplied, CollateralWithdrawn                           |     🌱 |
| Chai Money           | Transfer                                                                                                             |     🌱 |
| Ankr                 | StakeConfirmed, PendingUnstake, RewardsDistributed, RewardsClaimed                                                   |     🌱 |
| Paraswap             | BoughtV3, SwappedV3                                                                                                  |     🌱 |
| Metamask             | Swap                                                                                                                 |     🌱 |
| Airswap              | SwapV3, SwapV2                                                                                                       |     🌱 |
| Bungee               | SocketBridge                                                                                                         |     🌱 |
| Spark Protocol       | Supply, Withdraw, Borrow, Repay, Flashloan, Liquidation                                                              |     🌱 |
| Crvusd               | Borrow, Repay, RemoveCollateral, Liquidate                                                                           |     🌱 |
| OpenOcean.Finance    | Swapped                                                                                                              |     🌱 |
| Maverick (mav.xyz)   | Swap, AddLiquidity, RemoveLiquidity                                                                                  |     🌱 |
| GravitaProtocol.com  | VesselUpdated                                                                                                        |     🌱 |

### Nft Marketplaces

| Protocol  | Event                                                          | Status |
| :-------: | -------------------------------------------------------------- | -----: |
|   Blur    | OrdersMatch                                                    |     🌱 |
| Looksrare | TakerAsk, TakerBid, RoyaltyPayment, Deposit, Withdraw, Harvest |     🌱 |
|  Opensea  | OrderFullFilled                                                |     🌱 |
|   X2Y2    | Inventory                                                      |     🌱 |
|  Rarible  | Buy                                                            |     🌱 |
