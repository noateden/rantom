# Rantom - Blockchain Transaction Viewer

![Node Shield](https://img.shields.io/badge/Node-%5E18.0.0-339933?style=flat-square&logo=Node.js)
![Typescript Shield](https://img.shields.io/badge/Typescript-%5E4.6.3-3178C6?style=flat-square&logo=TypeScript)
![MongoDB Shield](https://img.shields.io/badge/MongoDB-bionic-47A248?style=flat-square&logo=mongodb)

**Ethereum blockchain transaction parser and reader in context.**

Project Website: https://rantom.app

If you enjoy this tool, you can support Rantom some server cost. Thank you!  
[0x254b42CaCf7290e72e2C84c0337E36E645784Ce1](https://etherscan.io/address/0x254b42CaCf7290e72e2C84c0337E36E645784Ce1)

## Introduction

Rantom is a blockchain transaction parser that inspect and read into smart contract logs and transform
them into context actions.

For example, look at this log piece from contract `0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640`:

```json
{
  "transactionHash": "0xc1d26c553de382f326362aa377968262369a0f73aa7a8b6db49d6c40635b9bef",
  "address": "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640",
  "blockHash": "0x153a2369466fbe3c56ea046f0f7e14ea0cccc129fa6373642a99d2d07cdf0162",
  "blockNumber": "0xfdd172",
  "data": "0x0000...031781",
  "logIndex": "0xca",
  "removed": false,
  "topics": [
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67",
    "0x000000000000000000000000ef1c6e67703c7bd7107eed8303fbe6ec2554bf6b",
    "0x000000000000000000000000ef1c6e67703c7bd7107eed8303fbe6ec2554bf6b"
  ],
  "transactionIndex": "0x63"
}
```

Rantom parses this piece of log into a context action that is a token swapping on [Uniswap v3 Protocol](https://uniswap.org/).

### Try the parser with any transaction hash:
- Using website: https://rantom.app/tx/0xeae38b389b1df87984de083dd43f0fe9f9ab98f4c880634c01847600f711f185
- Using API: https://api.rantom.app/api/v1/parser/parse/0xeae38b389b1df87984de083dd43f0fe9f9ab98f4c880634c01847600f711f185

## Read more

- [Supported blockchains and protocols](/docs/supported.md)
- [Self-host & Deployment Guide](/docs/deploy.md)
- [API Document](/docs/api-docs.md)

## Contribution

If you want to help, feel free to open a pull request 🙌
