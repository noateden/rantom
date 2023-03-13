import { Contract, Token } from '../../types/configs';
import OffchainAggregatorAbi from '../abi/chainlink/OffchainAggregator.json';
import { Tokens } from '../constants';

export interface ChainlinkOffchainAggregatorContract extends Contract {
  decimals: number;
  token: Token;
}

export const ChainlinkContracts: Array<ChainlinkOffchainAggregatorContract> = [
  {
    chain: 'ethereum',
    protocol: 'chainlink',
    abi: OffchainAggregatorAbi,
    address: '0x37bc7498f4ff12c19678ee8fe19d713b87f6a9e6',
    birthday: 12382429,
    decimals: 8,
    token: Tokens.ethereum.ETH,
    events: ['NewTransmission'],
  },
  {
    chain: 'ethereum',
    protocol: 'chainlink',
    abi: OffchainAggregatorAbi,
    address: '0xd2bdd1e01fd2f8d7d42b209c111c7b32158b5a42',
    birthday: 12143554,
    decimals: 8,
    token: Tokens.ethereum['1INCH'],
    events: ['NewTransmission'],
  },
  {
    chain: 'ethereum',
    protocol: 'chainlink',
    abi: OffchainAggregatorAbi,
    address: '0xe3f0dede4b499c07e12475087ab1a084b5f93bc0',
    birthday: 12742735,
    decimals: 8,
    token: Tokens.ethereum.AAVE,
    events: ['NewTransmission'],
  },
  {
    chain: 'ethereum',
    protocol: 'chainlink',
    abi: OffchainAggregatorAbi,
    address: '0xa99999b1475f24037e8b6947abbc7710676e77dd',
    birthday: 14584567,
    decimals: 8,
    token: Tokens.ethereum.APE,
    events: ['NewTransmission'],
  },
  {
    chain: 'ethereum',
    protocol: 'chainlink',
    abi: OffchainAggregatorAbi,
    address: '0x0fc3657899693648bba4dbd2d8b33b82e875105d',
    birthday: 12639809,
    decimals: 8,
    token: Tokens.ethereum.AVAX,
    events: ['NewTransmission'],
  },
];
