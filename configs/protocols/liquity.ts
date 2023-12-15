import { ContractConfig, ProtocolConfig, Token } from '../../types/configs';
import { AddressZero } from '../constants/addresses';
import { NativeTokens } from '../constants/nativeTokens';
import EthereumTokens from '../tokenlists/ethereum.json';

export interface LiquityMarket {
  chain: string;
  protocol: string;
  borrowOperation: ContractConfig;
  troveManager: ContractConfig;
  debtToken: Token;
  collToken: Token;
}

export interface LiquityConfig extends ProtocolConfig {
  markets: Array<LiquityMarket>;
}

const LiquityBorrowOperation: ContractConfig = {
  chain: 'ethereum',
  protocol: 'liquity',
  address: '0x24179cd81c9e782a4096035f7ec97fb8b783e007',
};
const LiquityTroveManager: ContractConfig = {
  chain: 'ethereum',
  protocol: 'liquity',
  address: '0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2',
};

export const LiquityConfigs: LiquityConfig = {
  protocol: 'liquity',
  contracts: [LiquityBorrowOperation, LiquityTroveManager],
  markets: [
    {
      chain: 'ethereum',
      protocol: 'liquity',
      borrowOperation: LiquityBorrowOperation,
      troveManager: LiquityTroveManager,
      debtToken: EthereumTokens.LUSD,
      collToken: {
        ...NativeTokens.ETH,
        chain: 'ethereum',
        address: AddressZero,
      },
    },
  ],
};
