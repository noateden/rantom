import BigNumber from 'bignumber.js';

export async function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

// standard timestamp UTC
export function getTimestamp(): number {
  return Math.floor(new Date().getTime() / 1000);
}

export function getTodayUTCTimestamp() {
  const today = new Date().toISOString().split('T')[0];
  return Math.floor(new Date(today).getTime() / 1000);
}

// get start day timestamp of a timestamp
export function getStartDayTimestamp(timestamp: number) {
  const theDay = new Date(timestamp * 1000).toISOString().split('T')[0];
  return Math.floor(new Date(theDay).getTime() / 1000);
}

export function stringReplaceAll(str: string, search: string, replacement: string) {
  return str.replace(new RegExp(search, 'g'), replacement);
}

export function normalizeAddress(address: string | undefined): string {
  return address ? address.toLowerCase() : '';
}

export function compareAddress(address1: string, address2: string): boolean {
  return normalizeAddress(address1) === normalizeAddress(address2);
}

export function transformToHttpUrl(url: string): string {
  if (url.includes('ipfs://')) {
    return `https://ipfs.io/ipfs/${url.split('://')[1]}`;
  }

  return url;
}

export const shortenAddress = (address: string, chars = 6) => {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

export const shortenTxid = (txid: string, chars = 10) => {
  return `${txid.substring(0, chars + 2)}...${txid.substring(txid.length - chars)}`;
};

export function hexStringToDecimal(hexString: string): number {
  return new BigNumber(hexString, 16).toNumber();
}

// https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa#code#L169
export function fromLittleEndian64(bytes8: string): string {
  // remove 0x
  const bytes8Value = bytes8.split('0x')[1];
  let swapBytes8 = '0x';
  swapBytes8 += bytes8Value[14] + bytes8Value[15];
  swapBytes8 += bytes8Value[12] + bytes8Value[13];
  swapBytes8 += bytes8Value[10] + bytes8Value[11];
  swapBytes8 += bytes8Value[8] + bytes8Value[9];
  swapBytes8 += bytes8Value[6] + bytes8Value[7];
  swapBytes8 += bytes8Value[4] + bytes8Value[5];
  swapBytes8 += bytes8Value[2] + bytes8Value[3];
  swapBytes8 += bytes8Value[0] + bytes8Value[1];

  return new BigNumber(hexStringToDecimal(swapBytes8).toString()).dividedBy(1e9).toString(10);
}
