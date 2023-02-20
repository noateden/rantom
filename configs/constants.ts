import { Token } from '../types/configs';
import EthereumTokens from './tokens/ethereum.json';

export const MongodbPrefix = 'rantom';

export const PasswordHashAlgorithm = 'sha1';

export const AddressZero = '0x0000000000000000000000000000000000000000';

export const Tokens: { [key: string]: { [key: string]: Token } } = {
  ethereum: EthereumTokens,
};

export const HardCodeTokens: { [key: string]: Token } = {
  'ethereum:0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {
    chain: 'ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    symbol: 'ETH',
    decimals: 18,
  },

  // Maker: I don't know why they make things to be complicated :(
  'ethereum:0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
    chain: 'ethereum',
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    symbol: 'MKR',
    decimals: 18,
  },
  'ethereum:0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359': {
    chain: 'ethereum',
    address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    symbol: 'SAI',
    decimals: 18,
  },

  // synapse protocol
  'avalanche:0x20a9dc684b4d0407ef8c9a302beaaa18ee15f656': {
    chain: 'avalanche',
    address: '0x62edc0692bd897d2295872a9ffcac5425011c661',
    symbol: 'GMX',
    decimals: 18,
  },

  // https://etherscan.io/token/0x9469d013805bffb7d3debe5e7839237e535ec483
  'ethereum:0x9469d013805bffb7d3debe5e7839237e535ec483': {
    chain: 'ethereum',
    address: '0x9469d013805bffb7d3debe5e7839237e535ec483',
    symbol: 'RING',
    decimals: 18,
  },

  // https://etherscan.io/token/0x0000000000a39bb272e79075ade125fd351887ac
  'ethereum:0x0000000000a39bb272e79075ade125fd351887ac': {
    chain: 'ethereum',
    address: '0x0000000000a39bb272e79075ade125fd351887ac',
    symbol: 'BlurPool',
    decimals: 18,
  },
};

export const HardcodeNft: { [key: string]: Token } = {
  'ethereum:0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85': {
    chain: 'ethereum',
    address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    symbol: 'ENS',
    decimals: 0,
    erc721: true,
  },
};
