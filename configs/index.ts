export const ParserVersion = '1.0.1';

// return initial block for worker syncing
export const WorkerGenesisBlocks: { [key: string]: number } = {
  ethereum: 18415016, // Oct-23-2023 07:20:59 PM +UTC
  arbitrum: 145790300, // Oct-31-2023 05:15:44 PM +UTC
  base: 6154823, // Nov-04-2023 11:56:33 AM +UTC
  optimism: 111150115, // Oct-21-2023 02:36:47 PM +UTC
  polygon: 49003136, // Oct-22-2023 02:17:48 AM +UTC
};

export const ApiQueryLogsCachingTime = 10 * 60; // 10 minutes
export const ApiQueryLogsLimitDefault = 1000;
