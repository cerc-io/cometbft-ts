import type { ReadChannel, ReadWriteChannel } from '@cerc-io/ts-channel';
import debug from 'debug';

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
  setLogger(logger: debug.Debugger): void
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
  logger?: debug.Debugger;
  private name: string = '';
  private started: number = 0; // atomic
  private stopped: number = 0; // atomic
  private quit?: ReadWriteChannel<void>;

  // The "subclass" of BaseService
  private impl?: Service;

  constructor (params: {
    logger?: debug.Debugger
    name?: string
    started?: number
    stopped?: number
    quit?: ReadWriteChannel<void>
    impl?: Service
  }) {
    Object.assign(this, params);
  }
}
