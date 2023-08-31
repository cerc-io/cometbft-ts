import { ReadChannel, ReadWriteChannel } from '@cerc-io/ts-channel';

import { ConsensusConfig } from '../config/config';
import { BaseService } from '../libs/service/service';
import { BlockExecutor } from '../state/execution';
import { BlockStore } from '../store/store';
import { PrivValidator } from '../types/priv-validator';
import { Vote } from '../types/vote';
import { RoundState } from './types/round-state';
import { State as smState } from '../state/state';
import * as crypto from '../crypto/crypto';
import { Message } from './reactor';
import { TimeoutTicker } from './ticker';
import { EventBus } from '../types/event-bus';
import { WAL } from './wal';
import { Proposal } from './proposal';
import { EventSwitch } from '../libs/events/events';

// msgs from the reactor which may update the state
interface msgInfo {
  msg: Message // `json:"msg"`
  // TODO: Implement using @cerc-io/peer
  peerID: any // `json:"peer_key"`
}

// interface to the mempool
interface txNotifier {
  txsAvailable(): ReadChannel<void>;
}

// interface to the evidence pool
interface evidencePool {
  // reports conflicting votes to the evidence pool to be processed into evidence
  reportConflictingVotes(voteA: Vote, voteB: Vote): void
}

// State handles execution of the consensus algorithm.
// It processes votes and proposals, and upon reaching agreement,
// commits blocks to the chain and executes them against the application.
// The internal state machine receives input from peers, the internal validator, and from a timer.
// TODO: Implement
export class State extends BaseService {
  // config details
  private config?: ConsensusConfig;
  private privValidator?: PrivValidator; // for signing votes

  // store blocks and commits
  private blockStore?: BlockStore;

  // create and execute blocks
  private blockExec?: BlockExecutor;

  // notify us if txs are available
  private txNotifier?: txNotifier;

  // add evidence to the pool
  // when it's detected
  private evpool?: evidencePool;

  // internal state

  // TODO: Mutex required?
  // private mtx cmtsync.RWMutex

  private roundState?: RoundState;
  private state?: smState; // State until height-1.
  // privValidator pubkey, memoized for the duration of one block
  // to avoid extra requests to HSM
  private privValidatorPubKey?: crypto.PubKey;

  // state changes may be triggered by: msgs from peers,
  // msgs from ourself, or by timeouts
  private peerMsgQueue?: ReadWriteChannel<msgInfo>;
  private internalMsgQueue?: ReadWriteChannel<msgInfo>;
  private timeoutTicker?: TimeoutTicker;

  // information about about added votes and block parts are written on this channel
  // so statistics can be computed by reactor
  private statsMsgQueue?: ReadWriteChannel<msgInfo>;

  // we use eventBus to trigger msg broadcasts in the reactor,
  // and to notify external subscribers, eg. through a websocket
  private eventBus?: EventBus;

  // a Write-Ahead Log ensures we can recover from any kind of crash
  // and helps us avoid signing conflicting votes
  private wal?: WAL;
  private replayMode?: boolean; // so we don't log signing errors during replay
  private doWALCatchup?: boolean; // determines if we even try to do the catchup

  // for tests where we want to limit the number of transitions the state makes
  private nSteps?: number;

  // some functions can be overwritten for testing
  private decideProposal?: (height: bigint, round: number) => void;
  private doPrevote?: (height: bigint, round: number) => void;
  // TODO: Can throw an error
  private setProposal?: (proposal: Proposal) => void;

  // closed when we finish shutting down
  private done?: ReadWriteChannel<void>;

  // synchronous pubsub between consensus state and reactor.
  // state only emits EventNewRoundStep and EventVote
  private evsw?: EventSwitch;

  // for reporting metrics
  // TODO: Implement metrics
  // private metrics *Metrics
}
