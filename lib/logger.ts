import winston from 'winston';

export interface LogEntry {
  message: string;
  props: any;

  service?: string;
  error?: any;
}

class LogProvider {
  private readonly logger: any;

  constructor() {
    const customFormat = winston.format.printf(({ timestamp, level, service, message, props }) => {
      let propsLine = '';

      if (props) {
        for (const [key, value] of Object.entries(props)) {
          propsLine += `${key}=${value} `;
        }
      }

      return `${timestamp} [${service}] ${level}: ${message.padEnd(40)} ${propsLine.slice(0, -1)}`;
    });

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), customFormat),
      transports: [new winston.transports.Console({})],
    });
  }

  public onInfo(entry: LogEntry): void {
    this.logger.info(entry.message, {
      service: entry.service,
      props: entry.props,
    });
  }

  public onDebug(entry: LogEntry): void {
    this.logger.debug(entry.message, {
      service: entry.service,
      props: entry.props,
    });
  }

  public onWarn(entry: LogEntry): void {
    this.logger.warn(entry.message, {
      service: entry.service,
      props: entry.props,
    });
  }

  public onError(entry: LogEntry): void {
    this.logger.error(entry.message, {
      service: entry.service,
      props: entry.props,
    });

    if (entry.error) {
      console.error(entry.error);
    }
  }
}

export default new LogProvider();
