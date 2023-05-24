import pino from 'pino';

export interface LogEntry {
  message: string;
  props: any;

  service?: string;
  error?: any;
}

class LogProvider {
  private readonly logger: any;

  constructor() {
    this.logger = pino({
      level: 'debug',
      enabled: !Boolean(process.env.SILENT_MODE),
      timestamp: pino.stdTimeFunctions.isoTime,
    });
  }

  public getLogger() {
    return this.logger;
  }

  public onInfo(entry: LogEntry): void {
    this.logger.info(
      {
        service: entry.service,
        props: entry.props,
      },
      entry.message
    );
  }

  public onDebug(entry: LogEntry): void {
    this.logger.debug(
      {
        service: entry.service,
        props: entry.props,
      },
      entry.message
    );
  }

  public onWarn(entry: LogEntry): void {
    this.logger.warn(
      {
        service: entry.service,
        props: entry.props,
      },
      entry.message
    );
  }

  public onError(entry: LogEntry): void {
    this.logger.error(
      {
        service: entry.service,
        props: entry.props,
        error: entry.error,
      },
      entry.message
    );
  }
}

export default new LogProvider();
