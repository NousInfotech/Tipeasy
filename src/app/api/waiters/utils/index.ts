import crypto from "crypto";

const ENCRYPTION_KEY = "b3JAVrp4kWp8sV9XxN7PpEzdjL2pquX3"; // Replace with a secure 32-byte key
const IV_LENGTH = 16; // Initialization vector length

export function encryptData(data: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}
