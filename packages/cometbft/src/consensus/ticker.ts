import { ReadChannel } from '@cerc-io/ts-channel';

import { Logger } from '../libs/log/logger';

// internally generated messages which may update the state
// TODO: Implement
export class timeoutInfo {}

// TimeoutTicker is a timer that schedules timeouts
// conditional on the height/round/step in the timeoutInfo.
// The timeoutInfo.Duration may be non-positive.
export interface TimeoutTicker {
  // TODO: Can throw an error
  Start(): void
  // TODO: Can throw an error
  Stop(): void
  Chan(): ReadChannel<timeoutInfo> // on which to receive a timeout
  ScheduleTimeout(ti: timeoutInfo): void // reset the timer

  SetLogger(l: Logger): void
}
