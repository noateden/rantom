import chalk from 'chalk';

export interface LogEntry {
  message: string;
  props: any;

  service?: string;
  error?: any;
}

class LogProvider {
  constructor() {}

  private static buildPropsLog(props: any): string {
    let logString = '';

    for (const [key, value] of Object.entries(props)) {
      logString += ` ${key}=${value}`;
    }

    return logString;
  }

  private static getMessage(service: string, message: string): string {
    return `${service}: ${message}`;
  }

  public onInfo(entry: LogEntry): void {
    if (!Boolean(process.env.SILENT_MODE)) {
      console.info(
        `${new Date().toISOString()} ${chalk.green(' INFO')} ${LogProvider.getMessage(
          entry.service ? entry.service : 'global',
          entry.message
        )}    ${LogProvider.buildPropsLog(entry.props)}`
      );
    }
  }

  public onDebug(entry: LogEntry): void {
    if (!Boolean(process.env.SILENT_MODE)) {
      console.info(
        `${new Date().toISOString()} ${chalk.grey('DEBUG')} ${LogProvider.getMessage(
          entry.service ? entry.service : 'global',
          entry.message
        )}    ${LogProvider.buildPropsLog(entry.props)}`
      );
    }
  }

  public onWarn(entry: LogEntry): void {
    if (!Boolean(process.env.SILENT_MODE)) {
      console.info(
        `${new Date().toISOString()} ${chalk.yellow(' WARN')} ${LogProvider.getMessage(
          entry.service ? entry.service : 'global',
          entry.message
        )}    ${LogProvider.buildPropsLog(entry.props)}`
      );
    }
  }

  public onError(entry: LogEntry): void {
    if (!Boolean(process.env.SILENT_MODE)) {
      console.info(
        `${new Date().toISOString()} ${chalk.red('ERROR')} ${LogProvider.getMessage(
          entry.service ? entry.service : 'global',
          entry.message
        )}    ${LogProvider.buildPropsLog(entry.props)}`
      );
      if (entry.error) {
        console.error(entry.error);
      }
    }
  }
}

export default new LogProvider();
