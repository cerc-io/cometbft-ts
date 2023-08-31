import { BaseService, Service } from '../libs/service/service';
import { Peer } from './peer';
import { Switch } from './switch';
import { Envelope } from './types';

// Reactor is responsible for handling incoming messages on one or more
// Channel. Switch calls GetChannels when reactor is added to it. When a new
// peer joins our node, InitPeer and AddPeer are called. RemovePeer is called
// when the peer is stopped. Receive is called when a message is received on a
// channel associated with this reactor.
//
// Peer#Send or Peer#TrySend should be used to send the message to a peer.
export interface Reactor extends Service {
  // SetSwitch allows setting a switch.
  setSwitch(s: Switch): void

  // GetChannels returns the list of MConnection.ChannelDescriptor. Make sure
  // that each ID is unique across all the reactors added to the switch.
  // TODO: Implement using @cerc-io/peer
  getChannels(): any[]

  // InitPeer is called by the switch before the peer is started. Use it to
  // initialize data for the peer (e.g. peer state).
  //
  // NOTE: The switch won't call AddPeer nor RemovePeer if it fails to start
  // the peer. Do not store any data associated with the peer in the reactor
  // itself unless you don't want to have a state, which is never cleaned up.
  initPeer(peer: Peer): Peer

  // AddPeer is called by the switch after the peer is added and successfully
  // started. Use it to start goroutines communicating with the peer.
  addPeer(peer: Peer): void

  // RemovePeer is called by the switch when the peer is stopped (due to error
  // or other reason).
  removePeer(peer: Peer, reason: any): void

  // ReceiveEnvelope is called by the switch when an envelope is received from any connected
  // peer on any of the channels registered by the reactor.
  receiveEnvelope(e: Envelope): void
}

// --------------------------------------

// TODO: Implement
export class BaseReactor extends BaseService {}
