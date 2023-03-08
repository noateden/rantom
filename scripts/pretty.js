/* eslint-disable */
const fs = require('fs');

const ethereumTokens = require('../configs/tokens/ethereum.json');

for (const [key] of Object.entries(ethereumTokens)) {
  ethereumTokens[key].address = ethereumTokens[key].address.toLowerCase();
}

let ordered = Object.keys(ethereumTokens)
  .sort()
  .reduce((obj, key) => {
    obj[key] = ethereumTokens[key];
    return obj;
  }, {});
fs.writeFileSync('./configs/tokens/ethereum.json', JSON.stringify(ordered).toString());
