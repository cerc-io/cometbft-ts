import * as bytes from '../libs/bytes/bytes';

// An address is a []byte, but hex-encoded even in JSON.
// []byte leaves us the option to change the address length.
// Use an alias so Unmarshal methods (with ptr receivers) are available too.
export type Address = bytes.HexBytes;

export interface PubKey {
  address(): Address;
  bytes(): Buffer;
  verifySignature(msg: Buffer, sig: Buffer): boolean;
  equals(p: PubKey): boolean;
  type(): string;
}

export interface PrivKey {
  bytes(): Buffer;
  sign(msg: Buffer): Promise<Buffer>;
  pubKey(): PubKey;
  equals(p: PrivKey): boolean;
  type(): string;
}

export interface Symmetric {
  keygen(): Buffer;
  encrypt(plaintext: Buffer, secret: Buffer): Buffer;
  decrypt(ciphertext: Buffer, secret: Buffer): Buffer;
}
