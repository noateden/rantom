// get all silo.finance pools
import fs from 'fs';
import Web3 from 'web3';

import SiloAbi from '../configs/abi/silo/Silo.json';
import SiloDepositoryAbi from '../configs/abi/silo/SiloDepository.json';
import EnvConfig from '../configs/envConfig';
import { SiloMarket } from '../configs/protocols/silo';
import { normalizeAddress } from '../lib/utils';
import BlockchainService from '../services/blockchains/blockchain';

const DepositoryAddresses = [
  'ethereum:15307297:0xd998C35B7900b344bbBe6555cc11576942Cf309d',
  'ethereum:17782708:0xbcd67f35c7a2f212db0ad7f68fc773b5ac15377c',
  'arbitrum:51895020:0x8658047e48CC09161f4152c79155Dac1d710Ff0a',
];

const RANGE = 2000;

(async function () {
  const protocol = 'silo';
  const blockchain = new BlockchainService();

  const allMarkets: Array<SiloMarket> = [];

  for (const config of DepositoryAddresses) {
    const [chain, birthBlock, address] = config.split(':');

    const web3 = new Web3(EnvConfig.blockchains[chain].nodeRpc);
    const depositoryContract = new web3.eth.Contract(SiloDepositoryAbi as any, address);

    let startBlock = Number(birthBlock);
    const latestBlock = await web3.eth.getBlockNumber();

    while (startBlock < latestBlock) {
      const toBlock = startBlock + RANGE > latestBlock ? latestBlock : startBlock + RANGE;
      const events = await depositoryContract.getPastEvents('NewSilo', { fromBlock: startBlock, toBlock });

      for (const event of events) {
        const siloAddress = event.returnValues.silo;

        const market: SiloMarket = {
          chain: chain,
          protocol,
          address: normalizeAddress(siloAddress),
          depository: normalizeAddress(address),
          assets: [],
        };

        const assets = await blockchain.singlecall({
          chain,
          target: siloAddress,
          abi: SiloAbi,
          method: 'getAssets',
          params: [],
        });

        for (const assetAddress of assets) {
          const token = await blockchain.getTokenInfo({
            chain,
            address: assetAddress,
          });
          if (token) {
            market.assets.push(token);
          }
        }

        console.info(
          `Got silo info silo:${market.address} token:${market.assets.map((item) => item.symbol).toString()}`
        );
      }

      startBlock += RANGE;
    }
  }

  fs.writeFileSync(`./configs/data/SiloMarkets.json`, JSON.stringify(allMarkets));
})();
