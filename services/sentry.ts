import * as Sentry from '@sentry/node';

import logger from '../lib/logger';
import { ISentryProvider } from '../types/namespaces';

class SentryProvider implements ISentryProvider {
  public readonly name: string = 'sentry';
  protected readonly _dns: string;

  constructor(dns: string) {
    this._dns = dns;

    // load sentry now
    Sentry.init({
      dsn: this._dns,

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }

  public capture(e: any) {
    logger.onDebug({
      service: this.name,
      message: 'captured exception',
      props: {
        error: e.message,
      },
    });
    Sentry.captureException(e);
  }

  public captureMessage(message: string) {
    logger.onDebug({
      service: this.name,
      message: 'captured message',
      props: {
        message: message,
      },
    });
    Sentry.captureMessage(message);
  }
}

export default SentryProvider;
