import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';

import { User } from '../interfaces/user';
import { Admin } from '../interfaces/admin';
import { InvalidSignatureError } from '../interfaces';

export interface SigVerificationBody {
  user: Admin | User;
  signature: string;
  publicAddress: string;
}

export class SignatureVerifier {
  static async verifySignature(body: SigVerificationBody): Promise<string> {
    const { user, signature, publicAddress } = body;
    // Frontend also has to sign this same message.
    const msg = `Luna MarketPlace user one-time Nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
      return address;
    } else {
      throw new InvalidSignatureError();
    }
  }
}
