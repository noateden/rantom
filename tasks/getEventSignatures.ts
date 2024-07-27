// this script help to get all events sisgantrue from given JSON ABI file
import fs from 'fs';
import { argv } from 'process';
import { keccak256, toEventSignature } from 'viem';

const filePath = argv[2];

if (fs.existsSync(filePath)) {
  const events: any = {};
  const abi = JSON.parse(fs.readFileSync(filePath).toString());
  for (const item of abi) {
    if (item.type === 'event') {
      events[item.name] = keccak256(toEventSignature(item) as any);
    }
  }
  console.table(events);
} else {
  console.log(`abi file ${filePath} not found`);
}

process.exit(0);
