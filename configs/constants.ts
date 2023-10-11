import { NonFungibleTokenMetadata, Token } from '../types/configs';
import EulerTokens from './data/EulerEAndDTokens.json';
import ArbitrumTokens from './tokens/arbitrum.json';
import BaseTokens from './tokens/base.json';
import EthereumTokens from './tokens/ethereum.json';

export const MongodbPrefix = 'rantom';

export const PasswordHashAlgorithm = 'sha1';

export const AddressZero = '0x0000000000000000000000000000000000000000';
export const AddressEEE = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
export const BeaconDepositContract = '0x00000000219ab540356cbb839cbe05303d7705fa';
export const MakerDSProxyFactoryContract = '0xa26e15c895efc0616177b7c1e7270a4c7d51c997';
export const InstadappAccountV2ImplementationContract = '0xcba828153d3a85b30b5b912e1f2dacac5816ae9d';

export const Tokens: { [key: string]: { [key: string]: Token } } = {
  ethereum: EthereumTokens,
  arbitrum: ArbitrumTokens,
  base: BaseTokens,
  mantle: {},
};

export const MulticallContracts: { [key: string]: string } = {
  ethereum: '0xca11bde05977b3631167028862be2a173976ca11',
  arbitrum: '0xca11bde05977b3631167028862be2a173976ca11',
  base: '0xca11bde05977b3631167028862be2a173976ca11',
  mantle: '0x05f3105fc9fc531712b2570f1c6e11dd4bcf7b3c',
};

export const BlockSubgraphs: { [key: string]: string } = {
  ethereum: 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks',
  arbitrum: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks',
  base: 'https://api.studio.thegraph.com/query/48211/base-blocks/version/latest',
  mantle: 'https://api.studio.thegraph.com/query/48211/base-blocks/version/latest',
};

export const LayerZeroChainIdMaps: { [key: number]: number } = {
  101: 1, // ethereum
  102: 56, // bnbchain
  106: 43114, // avalanche
  109: 137, // polygon
  110: 42161, // arbitrum
  111: 10, // optimism
  112: 250, // fantom
  151: 1088, // metis
  184: 8453, // base
  183: 59144, // linea
  177: 2222, // kava
};

export const CommonChainIdMaps: { [key: string]: number } = {
  ethereum: 1, // ethereum
  bnbchain: 56, // bnbchain
  avalanche: 43114, // avalanche
  polygon: 137, // polygon
  arbitrum: 42161, // arbitrum
  optimism: 10, // optimism
  fantom: 250, // fantom
  metis: 1088, // metis
  base: 8453, // base
  linea: 59144, // linea
  kava: 2222, // kava
  mantle: 5000, // kava
};

export const HardCodeTokens: { [key: string]: Token } = {
  'erc20-ethereum-0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {
    chain: 'ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    symbol: 'ETH',
    decimals: 18,
  },
  'erc20-arbitrum-0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': {
    chain: 'arbitrum',
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

  // gmxv2 index tokens
  'erc20-arbitrum-0x47904963fc8b2340414262125af798b9655e58cd': {
    chain: 'arbitrum',
    address: '0x47904963fc8b2340414262125af798b9655e58cd',
    symbol: 'BTC',
    decimals: 18,
  },
  'erc20-arbitrum-0xc4da4c24fd591125c3f47b340b6f4f76111883d8': {
    chain: 'arbitrum',
    address: '0xc4da4c24fd591125c3f47b340b6f4f76111883d8',
    symbol: 'DOGE',
    decimals: 18,
  },
  'erc20-arbitrum-0xc14e065b0067de91534e032868f5ac6ecf2c6868': {
    chain: 'arbitrum',
    address: '0xc14e065b0067de91534e032868f5ac6ecf2c6868',
    symbol: 'XRP',
    decimals: 18,
  },
  'erc20-arbitrum-0xb46a094bc4b0adbd801e14b9db95e05e28962764': {
    chain: 'arbitrum',
    address: '0xb46a094bc4b0adbd801e14b9db95e05e28962764',
    symbol: 'LTC',
    decimals: 18,
  },
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
