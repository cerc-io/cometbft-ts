// TODO: Implement using libp2p pubsub

// Query defines an interface for a query to be used for subscribing. A query
// matches against a map of events. Each key in this map is a composite of the
// even type and an attribute key (e.g. "{eventType}.{eventAttrKey}") and the
// values are the event values that are contained under that relationship. This
// allows event types to repeat themselves with the same set of keys and
// different values.
// TODO: Implement
export interface Query {}

// Server allows clients to subscribe/unsubscribe for messages, publishing
// messages with or without events, and manages internal state.
// TODO: Implement
export class Server {}
