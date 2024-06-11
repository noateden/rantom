import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { ServeCommand } from './commands/serve';

(async function () {
  dotenv.config();

  const serveCommand = new ServeCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantom')
    .command(serveCommand.name, serveCommand.describe, serveCommand.setOptions, serveCommand.execute)
    .help().argv;
})();
