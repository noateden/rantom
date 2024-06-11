import tomlJson from 'toml-json';

import { EnvConfig } from '../types/configs';

const config: any = tomlJson({ fileUrl: './configs.toml' });

console.log(config);

const envConfig: EnvConfig = {
  caching: {
    path: config.caching.path,
  },
  blockchains: config.blockchains,
};

export default envConfig;
