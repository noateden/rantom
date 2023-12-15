import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { IndexCommand } from './commands/indexing';
import { ServeCommand } from './commands/serve';

(async function () {
  dotenv.config();

  const serveCommand = new ServeCommand();
  const indexCommand = new IndexCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantomcore')
    .command(serveCommand.name, serveCommand.describe, serveCommand.setOptions, serveCommand.execute)
    .command(indexCommand.name, indexCommand.describe, indexCommand.setOptions, indexCommand.execute)
    .help().argv;
})();
