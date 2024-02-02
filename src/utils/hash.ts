import { createHash } from "crypto"

export const sha256Hash = (string: string) =>
  createHash("sha256").update(string).digest("hex")
