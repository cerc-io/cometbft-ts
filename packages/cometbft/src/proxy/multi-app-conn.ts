import { BaseService } from '../libs/service/service';

// AppConns is the CometBFT's interface to the application that consists of
// multiple connections.
// TODO: Implement
export interface AppConns {}

// multiAppConn implements AppConns.
//
// A multiAppConn is made of a few appConns and manages their underlying abci
// clients.
// TODO: on app restart, clients must reboot together
// TODO: Implement
class MultiAppConn extends BaseService {}
