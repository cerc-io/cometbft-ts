// XXX/TODO: These types should be moved to the indexer package.

// TxIndexer interface defines methods to index and search transactions.
// TODO: Implement
export interface TxIndexer {}

// Batch groups together multiple Index operations to be performed at the same time.
// NOTE: Batch is NOT thread-safe and must not be modified after starting its execution.
// TODO: Implement
export class Batch {}
