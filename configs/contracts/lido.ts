import { Contract } from '../../types/configs';
import LidoStETHAbi from '../abi/lido/stETH.json';

export const LidoContracts: Array<Contract> = [
  {
    chain: 'ethereum',
    protocol: 'lido',
    abi: {},
    address: '0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599',
    birthday: 16308190,
    events: [],
    topics: [
      '0x98d2bc018caf34c71a8f920d9d93d4ed62e9789506b74087b48570c17b28ed99', // SubmitEvent
      '0xaca94a3466fab333b79851ab29b0715612740e4ae0d891ef8e9bd2a1bf5e24dd', // ClaimTokensEvent
    ],
  },
  {
    chain: 'ethereum',
    protocol: 'lido',
    abi: LidoStETHAbi,
    address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
    birthday: 16308190,
    events: [],
    topics: [
      '0x96a25c8ce0baabc1fdefd93e9ed25d8e092a3332f3aa9a41722b5697231d1d1a', // Submitted
    ],
  },
];
