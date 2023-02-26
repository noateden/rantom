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

|     Protocol     | Event                                                    | Status |
|:----------------:|----------------------------------------------------------|-------:|
|    Uniswap v2    | Mint, Swap, Burn                                         |     🌱 |
|   Pancakeswap    |                                                          |     🌱 |
|    Shibaswap     |                                                          |     🌱 |
|     Fraxswap     |                                                          |     🌱 |
|      Sushi       | Mint, Swap, Burn, Stake, Unstake                         |     🌱 |
|    Uniswap v3    | Mint, Swap, Burn, Collect                                |     🌱 |
|     Balancer     | Swap, Join, Exit, FlashLoan                              |     🌱 |
|     Aave v1      | Deposit, Withdraw, Borrow, Repay, Flashloan, Liquidation |     🌱 |
|     Aave v2      |                                                          |     🌱 |
|     Aave v3      |                                                          |     🌱 |
|     Compound     | Mint, Redeem, Borrow, Repay, Liquidation                 |     🌱 |
|     IronBank     |                                                          |     🌱 |
|   Compound v3    | Supply, Withdraw, SupplyCollateral, WithdrawCollateral   |     🌱 |
|   Aura Finance   | Deposit, Withdraw, Collect                               |     🌱 |
|      Bancor      | Deposit, Withdraw, Trade, Flashloan                      |     🌱 |
|    Beanstalk     | Deposit, Withdraw                                        |     🌱 |
| CowSwap Protocol | Trade                                                    |     🌱 |
|      Curve       | Trade, AddLiquidity, RemoveLiquidity                     |     🌱 |
|   Hop Exchange   | TransferToL2                                             |     🌱 |
|       Lido       | Stake                                                    |     🌱 |
|   Rocket Pool    | Deposit, Withdraw                                        |     🌱 |
|     Loopring     | Deposit, Withdraw                                        |     🌱 |
|    Multichain    | SwapIn, SwapOut                                          |     🌱 |
|     Optimism     | Batch                                                    |     🌱 |

### Nft Marketplace

| Protocol  | Event                              | Status |
|:---------:|------------------------------------|-------:|
|   Blur    | OrdersMatch                        |     🌱 |
| Looksrare | TakerAsk, TakerBid, RoyaltyPayment |     🌱 |
|  Opensea  | OrderFullFilled                    |     🌱 |
|   X2Y2    | Inventory                          |     🌱 |
