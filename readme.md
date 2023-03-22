# Rantom - Blockchain Transaction Viewer

![Node Shield](https://img.shields.io/badge/Node-%5E16.0.0-brightgreen?style=flat-square&logo=JavaScript)
![Typescript Shield](https://img.shields.io/badge/Typescript-%5E4.6.3-blue?style=flat-square&logo=TypeScript)

## Try it yourself:
https://api.rantom.app/api/v1/parser/parse/0xeae38b389b1df87984de083dd43f0fe9f9ab98f4c880634c01847600f711f185

## Build
```bash
yarn && yarn compile
```

## Usage
```bash
yarn start --help
```

## Supported Events

- 🌱: Complete on live
- 🔨: Working in progress

### DeFi Protocols

|     Protocol     | Event                                                                                      | Status |
|:----------------:|--------------------------------------------------------------------------------------------|-------:|
|    Uniswap v2    | Mint, Swap, Burn                                                                           |     🌱 |
|   Pancakeswap    |                                                                                            |     🌱 |
|    Shibaswap     |                                                                                            |     🌱 |
|     Fraxswap     |                                                                                            |     🌱 |
|    Sushi Dex     | Mint, Swap, Burn                                                                           |     🌱 |
| Sushi Masterchef | Deposit, Withdraw, EmergencyWithdraw                                                       |     🌱 |
|    Uniswap v3    | Mint, Swap, Burn, Collect                                                                  |     🌱 |
|     Balancer     | Swap, Join, Exit, FlashLoan                                                                |     🌱 |
|     Aave v1      | Deposit, Withdraw, Borrow, Repay, Flashloan, Liquidation                                   |     🌱 |
|     Aave v2      | Supply, Withdraw, Borrow, Repay, Flashloan, Liquidation                                    |     🌱 |
|     Aave v3      | Supply, Withdraw, Borrow, Repay, Flashloan, Liquidation                                    |     🌱 |
|     Compound     | Mint, Redeem, Borrow, Repay, Liquidation, DistributedSupplierComp, DistributedBorrowerComp |     🌱 |
|     IronBank     |                                                                                            |     🌱 |
|   Compound v3    | Supply, Withdraw, SupplyCollateral, WithdrawCollateral, AbsorbCollateral                   |     🌱 |
|  Convex Finance  | Deposited, Withdrawn                                                                       |     🌱 |
|   Aura Finance   | Deposited, Withdrawn, Collect                                                              |     🌱 |
|      Bancor      | Deposit, Withdraw, Trade, Flashloan                                                        |     🌱 |
|    Beanstalk     | Deposit, Withdraw, Sow                                                                     |     🌱 |
| CowSwap Protocol | Trade                                                                                      |     🌱 |
|      Curve       | TokenExchange, AddLiquidity, RemoveLiquidity                                               |     🌱 |
|   Hop Exchange   | TransferToL2                                                                               |     🌱 |
|       Lido       | Submitted                                                                                  |     🌱 |
|   Rocket Pool    | TokensMinted, TokensBurned                                                                 |     🌱 |
|    Multichain    | SwapIn, SwapOut                                                                            |     🌱 |
|     Optimism     | Batch                                                                                      |     🌱 |
|  Eth2 Validator  | DepositEvent                                                                               |     🌱 |
|    Chainlink     | NewTransmission                                                                            |     🌱 |
|      Yearn       | Deposit, Withdraw                                                                          |     🌱 |
|   0x: Exchange   | TransformedERC20, OtcOrderFilled, LimitOrderFilled, RfqOrderFilled                         |     🌱 |

### Nft Marketplace

| Protocol  | Event                              | Status |
|:---------:|------------------------------------|-------:|
|   Blur    | OrdersMatch                        |     🌱 |
| Looksrare | TakerAsk, TakerBid, RoyaltyPayment |     🌱 |
|  Opensea  | OrderFullFilled                    |     🌱 |
|   X2Y2    | Inventory                          |     🌱 |
