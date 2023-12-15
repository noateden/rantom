import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import EthereumTokenList from '../tokenlists/ethereum.json';

export interface GearboxLiquidityPool extends ContractConfig {
  token: Token;
}

export interface GearboxConfig extends ProtocolConfig {
  contracts: Array<GearboxLiquidityPool>;
}

export const GearboxConfigs: GearboxConfig = {
  protocol: 'gearbox',
  contracts: [
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0xa7df60785e556d65292a2c9a077bb3a8fbf048bc', // Airdrop distributor
      token: EthereumTokenList.GEAR,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0x24946bcbbd028d5abb62ad9b635eb1b1a67af668',
      token: EthereumTokenList.DAI,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0x86130bdd69143d8a4e5fc50bf4323d48049e98e4',
      token: EthereumTokenList.USDC,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0xb03670c20f87f2169a7c4ebe35746007e9575901',
      token: EthereumTokenList.WETH,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0xb2a015c71c17bcac6af36645dead8c572ba08a08',
      token: EthereumTokenList.WBTC,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286',
      token: EthereumTokenList.wstETH,
    },
    {
      chain: 'ethereum',
      protocol: 'gearbox',
      address: '0x79012c8d491dcf3a30db20d1f449b14caf01da6c',
      token: EthereumTokenList.FRAX,
    },
  ],
};
