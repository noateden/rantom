import { NonFungibleTokenMetadata, Token } from '../types/configs';
import EulerTokens from './data/EulerEAndDTokens.json';
import EthereumTokens from './tokens/ethereum.json';

export const MongodbPrefix = 'rantom';

export const PasswordHashAlgorithm = 'sha1';

export const AddressZero = '0x0000000000000000000000000000000000000000';
export const BeaconDepositContract = '0x00000000219ab540356cbb839cbe05303d7705fa';

export const Tokens: { [key: string]: { [key: string]: Token } } = {
  ethereum: EthereumTokens,
};

export const MulticallContracts: { [key: string]: string } = {
  ethereum: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
};

export const BlockSubgraphs: { [key: string]: string } = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
};

export const ChainIdMaps: { [key: number]: string } = {
  1: 'ethereum',
  56: 'bnbchain',
  42161: 'arbitrum',
  137: 'polygon',
  43114: 'avalanche',
  10: 'optimism',
  250: 'fantom',
  42220: 'celo',
  25: 'cronos',
  122: 'fuse',
  32659: 'fusion',
  4689: 'iotex',
  1666600000: 'harmony',
  128: 'huobi',
  321: 'kucoin',
  1285: 'moonriver',
  1284: 'moonbeam',
  66: 'okex',
  336: 'shiden',
  40: 'telos',
  84: 'xdai',
  288: 'boba',
};

export const HardCodeTokens: { [key: string]: Token } = {
  'erc20-ethereum-0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {
    chain: 'ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    symbol: 'ETH',
    decimals: 18,
  },

  // Maker: I don't know why they make things to be complicated :(
  'erc20-ethereum-0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
    chain: 'ethereum',
    address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    symbol: 'MKR',
    decimals: 18,
  },
  'erc20-ethereum-0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359': {
    chain: 'ethereum',
    address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    symbol: 'SAI',
    decimals: 18,
  },

  // DS Tokens
  'erc20-ethereum-0x0d88ed6e74bbfd96b831231638b66c05571e824f': {
    chain: 'ethereum',
    address: '0x0d88ed6e74bbfd96b831231638b66c05571e824f',
    symbol: 'AVT',
    decimals: 18,
  },
  'erc20-ethereum-0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0': {
    chain: 'ethereum',
    address: '0x431ad2ff6a9c365805ebad47ee021148d6f7dbe0',
    symbol: 'DF',
    decimals: 18,
  },
  'erc20-ethereum-0x8e0e57dcb1ce8d9091df38ec1bfc3b224529754a': {
    chain: 'ethereum',
    address: '0x8e0e57dcb1ce8d9091df38ec1bfc3b224529754a',
    symbol: 'CAH',
    decimals: 18,
  },
  'erc20-ethereum-0xcfe4eb08e33272d98cb31e37a7be78d5c1b740c1': {
    chain: 'ethereum',
    address: '0xcfe4eb08e33272d98cb31e37a7be78d5c1b740c1',
    symbol: 'VB',
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
  'erc20-ethereum-0x9469d013805bffb7d3debe5e7839237e535ec483': {
    chain: 'ethereum',
    address: '0x9469d013805bffb7d3debe5e7839237e535ec483',
    symbol: 'RING',
    decimals: 18,
  },

  // https://etherscan.io/token/0x0000000000a39bb272e79075ade125fd351887ac
  'erc20-ethereum-0x0000000000a39bb272e79075ade125fd351887ac': {
    chain: 'ethereum',
    address: '0x0000000000a39bb272e79075ade125fd351887ac',
    symbol: 'BlurPool',
    decimals: 18,
  },

  // Euler.Finance e and d tokens
  ...EulerTokens,
};

export const HardcodeNft: { [key: string]: NonFungibleTokenMetadata } = {
  'nft-ethereum-0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85': {
    chain: 'ethereum',
    address: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    symbol: 'ENS',
  },
  'nft-ethereum-0x3397e734f0a8f209a87f6ed929d5cb8519748e5e': {
    chain: 'ethereum',
    address: '0x3397e734f0a8f209a87f6ed929d5cb8519748e5e',
    symbol: 'ERC1155',
  },
};
