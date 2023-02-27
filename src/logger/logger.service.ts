import { ConsoleLogger, LogLevel } from '@nestjs/common';

const DEFAULT_LOG_LEVELS: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
];

export class CustomLogger extends ConsoleLogger {
  constructor() {
    super('custom logger', {
      logLevels: DEFAULT_LOG_LEVELS.slice(0, +process.env.LOGGING_LEVEl),
    });
  }
}
