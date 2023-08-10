import fs from 'fs';

import { MuxAssetInfo, MuxHelper } from '../modules/adapters/mux/helper';

const LiquidityPool = '0x3e0199792Ce69DC29A0a36146bFa68bd7C8D6633';

(async function () {
  const assets: Array<MuxAssetInfo> = await MuxHelper.getAllAssetInfo('arbitrum', LiquidityPool);

  fs.writeFileSync(`./configs/data/MuxAssets.json`, JSON.stringify(assets));
})();
