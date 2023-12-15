import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import EthereumTokens from '../tokenlists/ethereum.json';

export interface MakerGemConfig extends ContractConfig {
  collateral: Token;
}

export interface MakerConfig extends ProtocolConfig {
  contracts: Array<MakerGemConfig | ContractConfig>;
  debtToken: Token;
  debtJoin: ContractConfig;
}

const Protocol = 'maker';

const DaiJoin: ContractConfig = {
  chain: 'ethereum',
  protocol: Protocol,
  address: '0x9759a6ac90977b93b58547b4a71c78317f391a28',
};

export const MakerConfigs: MakerConfig = {
  protocol: Protocol,
  debtToken: EthereumTokens.DAI,
  debtJoin: DaiJoin,
  contracts: [
    DaiJoin,
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x60744434d6339a6b27d73d9eda62b6f66a0a04fa', // DAI flashloan
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x2f0b23f53734252bda2277357e97e1517d6b042a', // ETH-A GemJoin
      collateral: EthereumTokens.WETH,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x08638eF1A205bE6762A8b935F5da9b700Cf7322c', // ETH-B GemJoin
      collateral: EthereumTokens.WETH,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e', // ETH-C GemJoin
      collateral: EthereumTokens.WETH,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0xa191e578a6736167326d05c119ce0c90849e84b7', // USDC-A GemJoin
      collateral: EthereumTokens.USDC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x2600004fd1585f7270756ddc88ad9cfa10dd0428', // USDC-B GemJoin
      collateral: EthereumTokens.USDC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x0ac6a1d74e84c2df9063bddc31699ff2a2bb22a2', // USDT-A GemJoin
      collateral: EthereumTokens.USDT,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0xbf72da2bd84c5170618fbe5914b0eca9638d5eb5', // WBTC-A GemJoin
      collateral: EthereumTokens.WBTC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0xfa8c996e158b80d77fbd0082bb437556a65b96e0', // WBTC-B GemJoin
      collateral: EthereumTokens.WBTC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x7f62f9592b823331e012d3c5ddf2a7714cfb9de2', // WBTC-C GemJoin
      collateral: EthereumTokens.WBTC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x0a59649758aa4d66e25f08dd01271e891fe52199', // USDC PSM A GemJoin
      collateral: EthereumTokens.USDC,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x79a0fa989fb7adf1f8e80c93ee605ebb94f7c6a5', // GUSD PSM A GemJoin
      collateral: EthereumTokens.GUSD,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x7e62b7e279dfc78deb656e34d6a435cc08a44666', // USDP PSM A GemJoin
      collateral: EthereumTokens.USDP,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x10cd5fbe1b404b7e19ef964b63939907bdaf42e2', // wstETH-A
      collateral: EthereumTokens.wstETH,
    },
    {
      chain: 'ethereum',
      protocol: Protocol,
      address: '0x248ccbf4864221fc0e840f29bb042ad5bfc89b5c', // wstETH-B
      collateral: EthereumTokens.wstETH,
    },
  ],
};
