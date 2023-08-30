// Logger is what any CometBFT library should take.
export interface Logger {
  debug(msg: string, ...keyvals: any[]): void;
  info(msg: string, ...keyvals: any[]): void;
  error(msg: string, ...keyvals: any[]): void;

  with(...keyvals: any[]): Logger;
}
