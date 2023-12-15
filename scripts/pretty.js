/* eslint-disable */
const fs = require('fs');

const chains = [
  'ethereum',
  'arbitrum',
  'base',
  'polygon',
  'optimism',
  'bnbchain',
  'avalanche',
  'fantom',
  'linea',
  'zksyncera',
  'polygonzkevm',
  'celo',
];

for (const chain of chains) {
  const tokenLis = require(`../configs/tokenlists/${chain}.json`);
  for (const [key] of Object.entries(tokenLis)) {
    tokenLis[key].address = tokenLis[key].address.toLowerCase();
  }

  let ordered = Object.keys(tokenLis)
    .sort()
    .reduce((obj, key) => {
      obj[key] = tokenLis[key];
      return obj;
    }, {});

  fs.writeFileSync(`./configs/tokenlists/${chain}.json`, JSON.stringify(ordered).toString());
}
