import Channel from '@cerc-io/ts-channel';
import type { ReadChannel, ReadWriteChannel } from '@cerc-io/ts-channel';

import { Logger } from '../log/logger';
import { newNopLogger } from '../log/nop-logger';

// Service defines a service that can be started, stopped, and reset.
export interface Service {
  // Start the service.
  // If it's already started or stopped, will return an error.
  // If OnStart() returns an error, it's returned by Start()
  // TODO: Can throw an error
  start(): void
  // TODO: Can throw an error
  onStart(): void

  // Stop the service.
  // If it's already stopped, will return an error.
  // OnStop must never error.
  // TODO: Can throw an error
  stop(): void
  onStop(): void

  // Reset the service.
  // Panics by default - must be overwritten to enable reset.
  // TODO: Can throw an error
  reset(): void
  // TODO: Can throw an error
  onReset(): void

  // Return true if the service is running
  isRunning(): boolean

  // Quit returns a channel, which is closed once service is stopped.
  quit(): ReadChannel<void>

  // String representation of the service
  string(): string

  // SetLogger sets a logger.
  setLogger(logger: Logger): void
}

/*
Classical-inheritance-style service declarations. Services can be started, then
stopped, then optionally restarted.

Users can override the OnStart/OnStop methods. In the absence of errors, these
methods are guaranteed to be called at most once. If OnStart returns an error,
service won't be marked as started, so the user can call Start again.

A call to Reset will panic, unless OnReset is overwritten, allowing
OnStart/OnStop to be called again.

The caller must ensure that Start and Stop are not called concurrently.

It is ok to call Stop without calling Start first.

Typical usage:

  type FooService struct {
    BaseService
    // private fields
  }

  func NewFooService() *FooService {
    fs := &FooService{
      // init
    }
    fs.BaseService = *NewBaseService(log, "FooService", fs)
    return fs
  }

  func (fs *FooService) OnStart() error {
    fs.BaseService.OnStart() // Always call the overridden method.
    // initialize private fields
    // start subroutines, etc.
  }

  func (fs *FooService) OnStop() error {
    fs.BaseService.OnStop() // Always call the overridden method.
    // close/destroy private fields
    // stop subroutines, etc.
  }
*/

// TODO: Implement
export class BaseService {
  logger?: Logger;
  private name: string = '';
  private started: number = 0; // atomic
  private stopped: number = 0; // atomic
  private _quit?: ReadWriteChannel<void>;

  // The "subclass" of BaseService
  private impl?: Service;

  constructor (params: {
    logger?: Logger
    name?: string
    started?: number
    stopped?: number
    _quit?: ReadWriteChannel<void>
    impl?: Service
  }) {
    Object.assign(this, params);
  }

  // NewBaseService creates a new BaseService.
  static newBaseService (logger: Logger | undefined, name: string, impl: Service): BaseService {
    if (!logger) {
      logger = newNopLogger();
    }

    return new BaseService({
      logger,
      name,
      _quit: Channel(),
      impl
    });
  }

  // SetLogger implements Service by setting a logger.
  setLogger (l: Logger): void {
    this.logger = l;
  }

  // Start implements Service by calling OnStart (if defined). An error will be
  // returned if the service is already running or stopped. Not to start the
  // stopped service, you need to call Reset.
  // TODO: Implement
  // TODO: Can throw an error
  start (): void {}

  // OnStart implements Service by doing nothing.
  // NOTE: Do not put anything in here,
  // that way users don't need to call BaseService.OnStart()
  onStart (): void {}

  // Stop implements Service by calling OnStop (if defined) and closing quit
  // channel. An error will be returned if the service is already stopped.
  // TODO: Implement
  // TODO: Can throw an error
  stop (): void {}

  // OnStop implements Service by doing nothing.
  // NOTE: Do not put anything in here,
  // that way users don't need to call BaseService.OnStop()
  onStop (): void {}

  // Reset implements Service by calling OnReset callback (if defined). An error
  // will be returned if the service is running.
  // TODO: Implement
  // TODO: Can throw an error
  reset (): void {}

  // OnReset implements Service by panicking.
  onReset (): void {
    // TODO: panic
    throw new Error('The service cannot be reset');
  }

  // IsRunning implements Service by returning true or false depending on the
  // service's state.
  // TODO: Implement
  isRunning (): boolean {
    return false;
  }

  // Wait blocks until the service is stopped.
  async wait (): Promise<void> {
    await this._quit?.shift();
  }

  // String implements Service by returning a string representation of the service.
  string (): string {
    return this.name;
  }

  // Quit Implements Service by returning a quit channel.
  quit (): ReadChannel<void> {
    return this._quit!.readOnly();
  }
}
