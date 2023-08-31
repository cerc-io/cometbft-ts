import { ReadChannel, ReadWriteChannel } from '@cerc-io/ts-channel';

import { ConsensusConfig } from '../config/config';
import { BaseService } from '../libs/service/service';
import { BlockExecutor } from '../state/execution';
import { BlockStore } from '../store/store';
import { PrivValidator } from '../types/priv-validator';
import { Vote } from '../types/vote';
import { RoundState, RoundStepType } from './types/round-state';
import { State as smState } from '../state/state';
import * as crypto from '../crypto/crypto';
import { BlockPartMessage, Message } from './reactor';
import { TimeoutTicker, timeoutInfo } from './ticker';
import { EventBus } from '../types/event-bus';
import { WAL } from './wal';
import { Proposal } from './proposal';
import { EventSwitch } from '../libs/events/events';
import { Logger } from '../libs/log/logger';
import { Block, Commit } from '../types/block';
import { ID } from '../p2p/key';
import { Part, PartSet, PartSetHeader } from '../types/part-set';
import { Validator } from '../types/validator';
import { SignedMsgType } from '../proto/tendermint/types/types.pb';

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
  private _setProposal?: (proposal: Proposal) => void;

  // closed when we finish shutting down
  private done?: ReadWriteChannel<void>;

  // synchronous pubsub between consensus state and reactor.
  // state only emits EventNewRoundStep and EventVote
  private evsw?: EventSwitch;

  // for reporting metrics
  // TODO: Implement metrics
  // private metrics *Metrics

  // TODO: Add constructor

  // NewState returns a new State.
  static newState (
    config: ConsensusConfig,
    state: smState,
    blockExec: BlockExecutor,
    blockStore: BlockStore,
    txNotifier: txNotifier,
    evpool: evidencePool,
    // eslint-disable-next-line no-use-before-define
    ...options: StateOption[]
  ): State {
    return {} as State;
  }

  // SetLogger implements Service.
  setLogger (l: Logger): void {}

  // SetEventBus sets event bus.
  setEventBus (b: EventBus): void {}

  // String returns a string.
  string (): string {
    // better not to access shared variables
    return 'ConsensusState';
  }

  // GetState returns a copy of the chain state.
  getState (): smState {
    return {} as smState;
  }

  // GetLastHeight returns the last height committed.
  // If there were no blocks, returns 0.
  getLastHeight (): bigint {
    return BigInt(0);
  }

  // GetRoundState returns a shallow copy of the internal consensus state.
  getRoundState (): RoundState {
    return {};
  }

  // GetRoundStateJSON returns a json of RoundState.
  // TODO: Can throw an error
  getRoundStateJSON (): Buffer {
    return Buffer.alloc(0);
  }

  // GetRoundStateSimpleJSON returns a json of RoundStateSimple
  // TODO: Can throw an error
  getRoundStateSimpleJSON (): Buffer {
    return Buffer.alloc(0);
  }

  // GetValidators returns a copy of the current validators.
  getValidators (): [bigint, Validator] {
    return [BigInt(0), {}];
  }

  // SetPrivValidator sets the private validator account for signing votes. It
  // immediately requests pubkey and caches it.
  setPrivValidator (priv: PrivValidator): void {}

  // SetTimeoutTicker sets the local timer. It may be useful to overwrite for
  // testing.
  setTimeoutTicker (timeoutTicker: TimeoutTicker): void {}

  // LoadCommit loads the commit for a given height.
  loadCommit (height: bigint): Commit {
    return {};
  }

  // OnStart loads the latest state via the WAL, and starts the timeout and
  // receive routines.
  // TODO: Can throw an error
  onStart (): void {}

  // timeoutRoutine: receive requests for timeouts on tickChan and fire timeouts on tockChan
  // receiveRoutine: serializes processing of proposoals, block parts, votes; coordinates state transitions
  private startRoutines (maxSteps: number): void {}

  // loadWalFile loads WAL data from file. It overwrites cs.wal.
  // TODO: Can throw an error
  private loadWalFile (): void {}

  // OnStop implements service.Service.
  onStop (): void {}

  // Wait waits for the the main routine to return.
  // NOTE: be sure to Stop() the event switch and drain
  // any event channels or this may deadlock
  async sait (): Promise<void> {
    await this.done?.shift();
  }

  // OpenWAL opens a file to log all consensus messages and timeouts for
  // deterministic accountability.
  // TODO: Can throw an error
  openWAL (walFile: string): WAL {
    return {} as WAL;
  }

  // ------------------------------------------------------------
  // Public interface for passing messages into the consensus state, possibly causing a state transition.
  // If peerID == "", the msg is considered internal.
  // Messages are added to the appropriate queue (peer or internal).
  // If the queue is full, the function may block.
  // TODO: should these return anything or let callers just use events?

  // AddVote inputs a vote.
  // TODO: Can throw an error
  addVote (vote: Vote, peerID: ID): boolean {
    return false;
  }

  // SetProposal inputs a proposal.
  // TODO: Can throw an error
  setProposal (proposal: Proposal, peerID: ID): void {}

  // AddProposalBlockPart inputs a part of the proposal block.
  // TODO: Can throw an error
  addProposalBlockPart (height: bigint, round: number, part: Part, peerID: ID): void {}

  // SetProposalAndBlock inputs the proposal and all block parts.
  // TODO: Can throw an error
  setProposalAndBlock (
    proposal: Proposal,
    block: Block,
    parts: PartSet,
    peerID: ID
  ): void {}

  // ------------------------------------------------------------
  // internal functions for managing the state

  private updateHeight (height: bigint): void {}

  private updateRoundStep (round: number, step: RoundStepType): void {}

  // enterNewRound(height, 0) at cs.StartTime.
  private scheduleRound0 (rs: RoundState): void {}

  // Attempt to schedule a timeout (by sending timeoutInfo on the tickChan)
  private scheduleTimeout (duration: number, height: bigint, round: number, step: RoundStepType): void {}

  // send a msg into the receiveRoutine regarding our own proposal, block part, or vote
  private sendInternalMessage (mi: msgInfo): void {}

  // Reconstruct LastCommit from SeenCommit, which we saved along with the block,
  // (which happens even before saving the state)
  private reconstructLastCommit (state: smState): void {}

  // Updates State and increments height to match that of state.
  // The round becomes 0 and cs.Step becomes cstypes.RoundStepNewHeight.
  private updateToState (state: smState): void {}

  private newStep (): void {}

  // -----------------------------------------
  // the main go routines

  // receiveRoutine handles messages which may cause state transitions.
  // it's argument (n) is the number of messages to process before exiting - use 0 to run forever
  // It keeps the RoundState and is the only thing that updates it.
  // Updates (state transitions) happen on timeouts, complete proposals, and 2/3 majorities.
  // State must be locked before any internal state is updated.
  private receiveRoutine (maxSteps: number): void {}

  // state transitions on complete-proposal, 2/3-any, 2/3-one
  private handleMsg (mi: msgInfo): void {}

  private handleTimeout (ti: timeoutInfo, rs: RoundState): void {}

  private handleTxsAvailable (): void {}

  // -----------------------------------------------------------------------------
  // State functions
  // Used internally by handleTimeout and handleMsg to make state transitions

  // Enter: `timeoutNewHeight` by startTime (commitTime+timeoutCommit),
  //
  //  or, if SkipTimeoutCommit==true, after receiving all precommits from (height,round-1)
  //
  // Enter: `timeoutPrecommits` after any +2/3 precommits from (height,round-1)
  // Enter: +2/3 precommits for nil at (height,round-1)
  // Enter: +2/3 prevotes any or +2/3 precommits for block or any from (height, round)
  // NOTE: cs.StartTime was already set for height.
  private enterNewRound (height: bigint, round: number): void {}

  // needProofBlock returns true on the first height (so the genesis app hash is signed right away)
  // and where the last block (height-1) caused the app hash to change
  private needProofBlock (height: bigint): boolean {
    return false;
  }

  // Enter (CreateEmptyBlocks): from enterNewRound(height,round)
  // Enter (CreateEmptyBlocks, CreateEmptyBlocksInterval > 0 ):
  //
  //  after enterNewRound(height,round), after timeout of CreateEmptyBlocksInterval
  //
  // Enter (!CreateEmptyBlocks) : after enterNewRound(height,round), once txs are in the mempool
  private enterPropose (height: bigint, round: number): void {}

  private isProposer (address: Buffer): boolean {
    return false;
  }

  private defaultDecideProposal (height: bigint, round: number): void {}

  // Returns true if the proposal block is complete &&
  // (if POLRound was proposed, we have +2/3 prevotes from there).
  private isProposalComplete (): boolean {
    return false;
  }

  // Create the next block to propose and return it. Returns nil block upon error.
  //
  // We really only need to return the parts, but the block is returned for
  // convenience so we can log the proposal block.
  //
  // NOTE: keep it side-effect free for clarity.
  // CONTRACT: cs.privValidator is not nil.
  // TODO: Can throw an error
  private createProposalBlock (): Block {
    return {};
  }

  // Enter: `timeoutPropose` after entering Propose.
  // Enter: proposal block and POL is ready.
  // Prevote for LockedBlock if we're locked, or ProposalBlock if valid.
  // Otherwise vote nil.
  private enterPrevote (height: bigint, round: number): void {}

  private defaultDoPrevote (height: bigint, round: number): void {}

  // Enter: any +2/3 prevotes at next round.
  private enterPrevoteWait (height: bigint, round: number): void {}

  // Enter: `timeoutPrevote` after any +2/3 prevotes.
  // Enter: `timeoutPrecommit` after any +2/3 precommits.
  // Enter: +2/3 precomits for block or nil.
  // Lock & precommit the ProposalBlock if we have enough prevotes for it (a POL in this round)
  // else, unlock an existing lock and precommit nil if +2/3 of prevotes were nil,
  // else, precommit nil otherwise.
  private enterPrecommit (height: bigint, round: number): void {}

  // Enter: any +2/3 precommits for next round.
  private enterPrecommitWait (height: bigint, round: number): void {}

  // Enter: +2/3 precommits for block
  private enterCommit (height: bigint, commitRound: number): void {}

  // If we have the block AND +2/3 commits for it, finalize.
  private tryFinalizeCommit (height: bigint): void {}

  // Increment height and goto cstypes.RoundStepNewHeight
  private finalizeCommit (height: bigint): void {}

  // TODO: Can throw an error
  private pruneBlocks (retainHeight: bigint): bigint {
    return BigInt(0);
  }

  private recordMetrics (height: bigint, block: Block): void {}

  // -----------------------------------------------------------------------------

  // TODO: Can throw an error
  private defaultSetProposal (proposal: Proposal): void {}

  // NOTE: block is not necessarily valid.
  // Asynchronously triggers either enterPrevote (before we timeout of propose) or tryFinalizeCommit,
  // once we have the full block.
  // TODO: Can throw an error
  private _addProposalBlockPart (msg: BlockPartMessage, peerID: ID): boolean {
    return false;
  }

  private handleCompleteProposal (blockHeight: bigint): void {}

  // Attempt to add the vote. if its a duplicate signature, dupeout the validator
  // TODO: Can throw an error
  private tryAddVote (vote: Vote, peerID: ID): boolean {
    return false;
  }

  // TODO: Can throw an error
  private _addVote (vote: Vote, peerID: ID): boolean {
    return false;
  }

  // CONTRACT: cs.privValidator is not nil.
  // TODO: Can throw an error
  private signVote (
    msgType: SignedMsgType,
    hash: Buffer,
    heade: PartSetHeader
  ) : Vote {
    return {};
  }

  private voteTime (): Date {
    return {} as Date;
  }

  // sign the vote and publish on internalMsgQueue
  private signAddVote (msgType: SignedMsgType, hash: Buffer, header: PartSetHeader): Vote {
    return {};
  }

  // updatePrivValidatorPubKey get's the private validator public key and
  // memoizes it. This func returns an error if the private validator is not
  // responding or responds with an error.
  // TODO: Can throw an error
  private updatePrivValidatorPubKey (): void {}

  // look back to check existence of the node's consensus votes before joining consensus
  // TODO: Can throw an error
  private checkDoubleSigningRisk (height: bigint): void {}

  private calculatePrevoteMessageDelayMetrics (): void {}
}

// StateOption sets an optional parameter on the State.
export type StateOption = (s: State) => void
