// TxKeySize is the size of the transaction key index
// const TxKeySize = sha256.Size
const TxKeySize = 32;

// Tx is an arbitrary byte array.
// NOTE: Tx has no types at this level, so when wire encoded it's just length-prefixed.
// Might we want types here ?
// TODO: Implement
export class Tx {
  value?: Buffer;
}

// TxKey is the fixed length array key used as an index.
// TxKey [TxKeySize]byte
export type TxKey = Buffer

// Txs is a slice of Tx.
// TODO: Implement
export class Txs {
  value?: Tx[];
}
