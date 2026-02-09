import type { IEncryptionService } from "@app/contracts/services/encryption-service.js";
import bcrypt from "bcrypt";
import { injectable } from "tsyringe";

@injectable()
export class BcryptEncryptionService implements IEncryptionService {
  SALT_ROUNDS = 10;

  async hash(plainText: string): Promise<string> {
    const hashedText = await bcrypt.hash(plainText, this.SALT_ROUNDS);
    return hashedText;
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainText, hashedText);
    return isMatch;
  }
}
