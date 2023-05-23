import dotenv from 'dotenv';
import yargs from 'yargs/yargs';

import { IndexCommand } from './commands';
import { GetlogCommand } from './commands/getlog';
import { MetricCommand } from './commands/metric';
import { ParseCommand } from './commands/parse';
import { ReportCommand } from './commands/report';
import { ServeCommand } from './commands/serve';
import { TestCommand } from './commands/test';

(async function () {
  dotenv.config();

  const testCmd = new TestCommand();
  const indexCmd = new IndexCommand();
  const parseCmd = new ParseCommand();
  const serveCmd = new ServeCommand();
  const getlogCmd = new GetlogCommand();
  const reportCmd = new ReportCommand();
  const metricCmd = new MetricCommand();

  yargs(process.argv.slice(2))
    .scriptName('rantom')
    .command(testCmd.name, testCmd.describe, testCmd.setOptions, testCmd.execute)
    .command(indexCmd.name, indexCmd.describe, indexCmd.setOptions, indexCmd.execute)
    .command(parseCmd.name, parseCmd.describe, parseCmd.setOptions, parseCmd.execute)
    .command(serveCmd.name, serveCmd.describe, serveCmd.setOptions, serveCmd.execute)
    .command(getlogCmd.name, getlogCmd.describe, getlogCmd.setOptions, getlogCmd.execute)
    .command(reportCmd.name, reportCmd.describe, reportCmd.setOptions, reportCmd.execute)
    .command(metricCmd.name, metricCmd.describe, metricCmd.setOptions, metricCmd.execute)
    .help().argv;
})();
