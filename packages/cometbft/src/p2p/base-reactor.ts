import { BaseService, Service } from '../libs/service/service';

// Reactor is responsible for handling incoming messages on one or more
// Channel. Switch calls GetChannels when reactor is added to it. When a new
// peer joins our node, InitPeer and AddPeer are called. RemovePeer is called
// when the peer is stopped. Receive is called when a message is received on a
// channel associated with this reactor.
//
// Peer#Send or Peer#TrySend should be used to send the message to a peer.
// TODO: Implement
export interface Reactor extends Service {}

// --------------------------------------

// TODO: Implement
export class BaseReactor extends BaseService {}
