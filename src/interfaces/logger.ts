type LoggerLevel = 'off' | 'all' | 'debug' | 'warn' | 'error';

export interface ILoggerOptions {
  id: string;
  level?: LoggerLevel;
}

export interface Logger {
  Info(...info: any): void;
  Error(...error: any): void;
  Debug?(...message: any): void;
  Warn?(...message: any): void;
  Trace?(...message: any): void;
}
