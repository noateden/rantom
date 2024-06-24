import tomlJson from 'toml-json';

import { EnvConfig } from '../types/configs';

const config: any = tomlJson({ fileUrl: './configs.toml' });

const envConfig: EnvConfig = {
  blockchains: config.blockchains,
};

export default envConfig;
