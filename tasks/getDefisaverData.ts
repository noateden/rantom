import Web3 from 'web3';

import DefisaverRegistryAbi from '../configs/abi/defisaver/DFSRegistry.json';
import EnvConfig from '../configs/envConfig';

const DFSRegistry = '0x287778F121F134C66212FB16c9b53eC991D32f5b';

(async function () {
  const web3 = new Web3(EnvConfig.blockchains.ethereum.nodeRpc);
  const registryContract = new web3.eth.Contract(DefisaverRegistryAbi as any, DFSRegistry);

  let startBlock = 14171278;
  const latestBlock = await web3.eth.getBlockNumber();

  // const actions: {[key: string]: string} = {};
  while (startBlock <= latestBlock) {
    const toBlock = startBlock + 2000 > latestBlock ? latestBlock : startBlock + 2000;
    let events = await registryContract.getPastEvents('StartContractChange', { fromBlock: startBlock, toBlock });
    events = events.concat(await registryContract.getPastEvents('AddNewContract', { fromBlock: startBlock, toBlock }));
    events = events.concat(
      await registryContract.getPastEvents('ApproveContractChange', { fromBlock: startBlock, toBlock })
    );

    startBlock = startBlock + 2000;
  }
})();
