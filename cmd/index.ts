import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { GetlogCommand } from './commands/getlog';
import { ParseCommand } from './commands/parse';
import { ServeCommand } from './commands/serve';
import { SubgraphCommand } from './commands/subgraph';
import { TestCommand } from './commands/test';

(async function () {
  dotenv.config();

  const testCmd = new TestCommand();
  const parseCmd = new ParseCommand();
  const serveCmd = new ServeCommand();
  const getlogCmd = new GetlogCommand();
  const subgraphCmd = new SubgraphCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantom')
    .command(testCmd.name, testCmd.describe, testCmd.setOptions, testCmd.execute)
    .command(parseCmd.name, parseCmd.describe, parseCmd.setOptions, parseCmd.execute)
    .command(serveCmd.name, serveCmd.describe, serveCmd.setOptions, serveCmd.execute)
    .command(getlogCmd.name, getlogCmd.describe, getlogCmd.setOptions, getlogCmd.execute)
    .command(subgraphCmd.name, subgraphCmd.describe, subgraphCmd.setOptions, subgraphCmd.execute)
    .help().argv;
})();
