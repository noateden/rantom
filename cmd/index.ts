import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { ParseCommand } from './commands/parse';
import { ServeCommand } from './commands/serve';
import { TestCommand } from './commands/test';

(async function () {
  dotenv.config();

  const testCmd = new TestCommand();
  const parseCmd = new ParseCommand();
  const serveCmd = new ServeCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantom')
    .command(testCmd.name, testCmd.describe, testCmd.setOptions, testCmd.execute)
    .command(parseCmd.name, parseCmd.describe, parseCmd.setOptions, parseCmd.execute)
    .command(serveCmd.name, serveCmd.describe, serveCmd.setOptions, serveCmd.execute)
    .help().argv;
})();
