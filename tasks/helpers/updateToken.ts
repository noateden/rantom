// this help to update a token config into token list
import fs from 'fs';

import { Token } from '../../types/configs';

const DefaultPath = './configs/tokenlists';
export default function (token: Token) {
  let allTokens: { [key: string]: Token } = {};

  if (fs.existsSync(`${DefaultPath}/${token.chain}.json`)) {
    allTokens = JSON.parse(fs.readFileSync(`${DefaultPath}/${token.chain}.json`).toString());
  }

  allTokens[token.symbol] = token;

  fs.writeFileSync(`${DefaultPath}/${token.chain}.json`, JSON.stringify(allTokens));
}
