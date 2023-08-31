// EventSwitch is the interface for synchronous pubsub, where listeners
// subscribe to certain events and, when an event is fired (see Fireable),
// notified via a callback function.
//
// Listeners are added by calling AddListenerForEvent function.
// They can be removed by calling either RemoveListenerForEvent or
// RemoveListener (for all events).
// TODO: Implement
export interface EventSwitch {}
