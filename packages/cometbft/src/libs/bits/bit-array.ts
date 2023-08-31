// BitArray is a thread-safe implementation of a bit array.
// TODO: Implement
export class BitArray {
  // TODO: Mutex required?
  // mtx   sync.Mutex

  bits?: number; // `json:"bits"`  // NOTE: persisted via reflect, must be exported
  elems?: bigint[]; // `json:"elems"` // NOTE: persisted via reflect, must be exported
}
