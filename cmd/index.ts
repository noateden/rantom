import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { IndexCommand } from './commands';
import { GetlogCommand } from './commands/getlog';
import { ParseCommand } from './commands/parse';
import { ServeCommand } from './commands/serve';
import { TestCommand } from './commands/test';

(async function () {
  dotenv.config();

  const testCmd = new TestCommand();
  const parseCmd = new ParseCommand();
  const serveCmd = new ServeCommand();
  const indexCmd = new IndexCommand();
  const getlogCmd = new GetlogCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantom')
    .command(testCmd.name, testCmd.describe, testCmd.setOptions, testCmd.execute)
    .command(parseCmd.name, parseCmd.describe, parseCmd.setOptions, parseCmd.execute)
    .command(serveCmd.name, serveCmd.describe, serveCmd.setOptions, serveCmd.execute)
    .command(indexCmd.name, indexCmd.describe, indexCmd.setOptions, indexCmd.execute)
    .command(getlogCmd.name, getlogCmd.describe, getlogCmd.setOptions, getlogCmd.execute)
    .help().argv;
})();
