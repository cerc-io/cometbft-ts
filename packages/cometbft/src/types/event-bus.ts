import { BaseService, BaseServiceParams } from '../libs/service/service';
import * as cmtpubsub from '../libs/pubsub/pubsub';
import { Logger } from '../libs/log/logger';
import {
  EventDataCompleteProposal,
  EventDataNewBlock,
  EventDataNewBlockHeader,
  EventDataNewEvidence,
  EventDataNewRound,
  EventDataRoundState,
  EventDataTx,
  EventDataValidatorSetUpdates,
  EventDataVote,
  TMEventData
} from './events';
import * as types from '../abci/types/types.pb';

const defaultCapacity = 0;

// TODO: Implement
export interface EventBusSubscriber {}

// TODO: Implement
export interface Subscription {}

interface EventBusParams extends BaseServiceParams {
  pubsub?: cmtpubsub.Server;
}

// EventBus is a common bus for all events going through the system. All calls
// are proxied to underlying pubsub server. All events must be published using
// EventBus to ensure correct data types.
// TODO: Implement
export class EventBus extends BaseService {
  pubsub?: cmtpubsub.Server;

  constructor (params: EventBusParams) {
    super(params);
    Object.assign(this, params);
  }

  // NewEventBus returns a new event bus.
  static newEventBus (): EventBus {
    return EventBus.newEventBusWithBufferCapacity(defaultCapacity);
  }

  // NewEventBusWithBufferCapacity returns a new event bus with the given buffer capacity.
  static newEventBusWithBufferCapacity (cap: number): EventBus {
    return {} as EventBus;
  }

  // TODO: Implement
  setLogger (l: Logger) {}

  // TODO: Implement
  // TODO: Can throw an error
  onStart (): void {}

  // TODO: Implement
  onStop (): void {}

  // TODO: Implement
  numClients (): number {
    return 0;
  }

  // TODO: Implement
  numClientSubscriptions (clientID: string): number {
    return 0;
  }

  // TODO: Implement
  // TODO: Can throw an error
  subscribe (
    // TODO: Implement Context
    ctx: any,
    subscriber: string,
    query: cmtpubsub.Query,
    ...outCapacity: number[]
  ): Subscription {
    return {} as Subscription;
  }

  // This method can be used for a local consensus explorer and synchronous
  // testing. Do not use for for public facing / untrusted subscriptions!
  // TODO: Implement
  // TODO: Can throw an error
  subscribeUnbuffered (
    ctx: any,
    subscriber: string,
    query: cmtpubsub.Query
  ): Subscription {
    return {} as Subscription;
  }

  // TODO: Implement
  // TODO: Can throw an error
  unsubscribe (ctx: any, subscriber: string, query: cmtpubsub.Query): void {}

  // TODO: Implement
  // TODO: Can throw an error
  unsubscribeAll (ctx: any, subscriber: string): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publish (eventType: string, eventData: TMEventData): void {}

  // validateAndStringifyEvents takes a slice of event objects and creates a
  // map of stringified events where each key is composed of the event
  // type and each of the event's attributes keys in the form of
  // "{event.Type}.{attribute.Key}" and the value is each attribute's value.
  // TODO: Implement
  private validateAndStringifyEvents (events: types.Event[], logger: Logger): Map<string, string[]> {
    return new Map();
  }

  // TODO: Implement
  // TODO: Can throw an error
  publishEventNewBlock (data: EventDataNewBlock): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventNewBlockHeader (data: EventDataNewBlockHeader): void {}

  // TODO: Implement
  // TODO: Can throw an error
  PublishEventNewEvidence (evidence: EventDataNewEvidence): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventVote (data: EventDataVote): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventValidBlock (data: EventDataRoundState): void {}

  // PublishEventTx publishes tx event with events from Result. Note it will add
  // predefined keys (EventTypeKey, TxHashKey). Existing events with the same keys
  // will be overwritten.
  // TODO: Implement
  // TODO: Can throw an error
  publishEventTx (data: EventDataTx): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventNewRoundStep (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventTimeoutPropose (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventTimeoutWait (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventNewRound (data: EventDataNewRound): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventCompleteProposal (data: EventDataCompleteProposal): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventPolka (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventUnlock (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventRelock (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventLock (data: EventDataRoundState): void {}

  // TODO: Implement
  // TODO: Can throw an error
  publishEventValidatorSetUpdates (data: EventDataValidatorSetUpdates): void {}
}
