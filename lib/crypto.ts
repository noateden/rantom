import bs58 from 'bs58';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { PasswordHashAlgorithm } from '../configs/constants';

export function createPasswordHash(plainText: string): string {
  return crypto.createHash(PasswordHashAlgorithm).update(plainText).digest('hex');
}

export function createDataHash(plainText: string): string {
  return crypto.createHash('sha1').update(plainText).digest('hex');
}

export function signJwtToken(data: any, expired: string, secret: string): string {
  return jwt.sign(data, secret, { expiresIn: expired });
}

export function decodeJwtToken(token: string, secret: string): any {
  return jwt.verify(token, secret);
}

export function getBytes32FromIpfsHash(ipfsHash: string): string {
  return '0x' + Buffer.from(bs58.decode(ipfsHash).slice(2)).toString('hex');
}

export function getIpfsHashFromBytes32(bytes32: string): string {
  // Add our default ipfs values for first 2 bytes:
  // function:0x12=sha2, size:0x20=256 bits
  // and cut off leading "0x"
  const hashHex = '1220' + bytes32.slice(2);
  const hashBytes = Buffer.from(hashHex, 'hex');
  return bs58.encode(hashBytes);
}
