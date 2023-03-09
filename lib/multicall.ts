import { ethers } from 'ethers';
import Web3 from 'web3';

import MultiCall2Abi from '../configs/abi/Multicall2.json';
import { MulticallContracts } from '../configs/constants';
import envConfig from '../configs/envConfig';
import { MultiCallResponse, MulticallCall, MulticallOptions } from '../types/options';

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return includes a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const multicallv2 = async <T = any>(
  chain: string,
  abi: any[],
  calls: MulticallCall[],
  options: MulticallOptions = { requireSuccess: true }
): Promise<MultiCallResponse<T>> => {
  const { requireSuccess } = options;
  const web3 = new Web3(envConfig.blockchains[chain].nodeRpc);
  const multi = new web3.eth.Contract(MultiCall2Abi as any, MulticallContracts[chain]);
  const itf = new ethers.utils.Interface(abi);

  const callData = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)]);
  const returnData = await multi.methods.tryAggregate(requireSuccess, callData).call();

  return returnData.map((call: any, i: number) => {
    const [result, data] = call;
    return result ? itf.decodeFunctionResult(calls[i].name, data) : null;
  });
};
