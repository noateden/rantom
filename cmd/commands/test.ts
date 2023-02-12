import { BasicCommand } from '../basic';

export class TestCommand extends BasicCommand {
  public readonly name: string = 'test';
  public readonly describe: string = 'Run a test command';

  constructor() {
    super();
  }

  public async execute(argv: any) {
    console.info('Hello World!');

    process.exit(0);
  }
}
