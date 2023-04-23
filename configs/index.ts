export const ParserVersion = '1.0.1';

// return latest transactions on-chain
export const MaxExploreTransactions = 3;

// return initial block for worker syncing
export const WorkerGenesisBlocks: { [key: string]: number } = {
  ethereum: 16308190, // Jan-01-2023 12:00:11 AM +UTC
};

export const ApiQueryLogsCachingTime = 10 * 60; // 10 minutes
export const ApiQueryProtocolStatsCachingTime = 30 * 60; // 30 minutes
