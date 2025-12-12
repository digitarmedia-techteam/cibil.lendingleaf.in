import CryptoJS from "crypto-js";

export function generateClickId(): string {
  // Using crypto for consistent randomness without time-based mismatch
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));

  const base = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const hash = CryptoJS.MD5(base).toString();

  return "LF-" + hash;
}
