export const ParserVersion = '1.0.1';

// return initial block for worker syncing
export const WorkerGenesisBlocks: { [key: string]: number } = {
  ethereum: 16308190, // Jan-01-2023 12:00:11 AM +UTC
  arbitrum: 119354719, // Aug-08-2023 11:15:41 AM +UTC
  base: 3100110, // Aug-25-2023 06:52:47 PM +UTC
  optimism: 111059574, // Oct-19-2023 12:18:45 PM +UTC
  polygon: 48903136, // Oct-19-2023 12:18:56 PM +UTC
};

export const ApiQueryLogsCachingTime = 10 * 60; // 10 minutes
export const ApiQueryLogsLimitDefault = 1000;
