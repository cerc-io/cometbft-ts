import { BaseService } from '../libs/service/service';

// State handles execution of the consensus algorithm.
// It processes votes and proposals, and upon reaching agreement,
// commits blocks to the chain and executes them against the application.
// The internal state machine receives input from peers, the internal validator, and from a timer.
// TODO: Implement
export class State extends BaseService {}
