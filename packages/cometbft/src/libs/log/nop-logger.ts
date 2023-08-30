import { Logger } from './logger';

class NopLogger implements Logger {
  info (msg: string, ...keyvals: any[]): void {}
  debug (msg: string, ...keyvals: any[]): void {}
  error (msg: string, ...keyvals: any[]): void {}

  with (...keyvals: any[]): Logger {
    return this;
  }
}

// NewNopLogger returns a logger that doesn't do anything.
export function newNopLogger (): Logger {
  return new NopLogger();
}
