import { Contract } from '../../types/configs';
import CurvePools from '../data/CurvePools.json';

export const CurveContracts: Array<Contract> = [
  ...CurvePools.map((item) => {
    return {
      chain: 'ethereum',
      protocol: 'curve',
      abi: {},
      address: item.address,
      birthday: 16308190,
      events: [],
      topics: [
        '0xd013ca23e77a65003c2c659c5442c00c805371b7fc1ebd4c206c41d1536bd90b',
        '0x3f1915775e0c9a38a57a7bb7f1f9005f486fb904e1f84aa215364d567319a58d',
        '0x9878ca375e106f2a43c3b599fc624568131c4c9a4ba66a14563715763be9d59d',
        '0x8b3e96f2b889fa771c53c981b40daf005f63f637f1869f707052d15a3dd97140',
        '0x423f6495a08fc652425cf4ed0d1f9e37e571d9b9529b1c1c23cce780b2e7df0d',
        '0xa49d4cf02656aebf8c771f5a8585638a2a15ee6c97cf7205d4208ed7c1df252d',
        '0x9e96dd3b997a2a257eec4df9bb6eaf626e206df5f543bd963682d143300be310',
        '0x173599dbf9c6ca6f7c3b590df07ae98a45d74ff54065505141e7de6c46a624c2',
        '0x26f55a85081d24974e85c6c00045d0f0453991e95873f52bff0d21af4079a768',
        '0x7c363854ccf79623411f8995b362bce5eddff18c927edc6f5dbbb5e05819a82c',
        '0x2b5508378d7e19e0d5fa338419034731416c4f5b219a10379956f764317fd47e',
        '0xb2e76ae99761dc136e598d4a629bb347eccb9532a5f8bbd72e18467c3c34cc98',
        '0x96b486485420b963edd3fdec0b0195730035600feb7de6f544383d7950fa97ee',
        '0xd6cc314a0b1e3b2579f8e64248e82434072e8271290eef8ad0886709304195f5',
        '0x5ad056f2e28a8cec232015406b843668c1e36cda598127ec3b8c59b8c72773a0',
        '0x540ab385f9b5d450a27404172caade516b3ba3f4be88239ac56a2ad1de2a1f5a',
        '0xdd3c0336a16f1b64f172b7bb0dad5b2b3c7c76f91e8c4aafd6aae60dce800153',
      ],
    };
  }),
  {
    chain: 'ethereum',
    protocol: 'curve',
    abi: {},
    address: '0x5f3b5dfeb7b28cdbd7faba78963ee202a494e2a2',
    birthday: 10647812,
    events: [],
    topics: [
      '0x4566dfc29f6f11d13a418c26a02bef7c28bae749d4de47e4e6a7cddea6730d59', // Deposit
      '0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568', // Withdraw
    ],
  },
];
