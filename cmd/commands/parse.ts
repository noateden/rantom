import { ParserProvider } from '../../modules/parser';
import { Transaction } from '../../types/domains';
import { BasicCommand } from '../basic';

export class ParseCommand extends BasicCommand {
  public readonly name: string = 'parse';
  public readonly describe: string = 'Parse transaction logs into readable actions';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    const parserProvider = new ParserProvider(null);

    const transactions: Array<Transaction> = await parserProvider.parseTransaction({ hash: argv.hash });

    console.info(JSON.stringify(transactions));

    process.exit(0);
  }

  public setOptions(yargs: any) {
    return yargs.option({
      hash: {
        type: 'string',
        default: '',
        describe: 'Parse transaction data with given hash',
      },
    });
  }
}
