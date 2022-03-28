import { Logger, ILoggerOptions } from '../../interfaces';
import { Log4js } from './log4js';

export class LoggerFactory {
  logger: Logger;
  options: ILoggerOptions;

  constructor(options: ILoggerOptions) {
    this.options = options;

    this.logger = new Log4js(options);
  }

  static configure(options: ILoggerOptions): Logger {
    return new LoggerFactory(options).logger;
  }
}
