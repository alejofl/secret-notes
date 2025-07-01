import { encrypt, decrypt } from "./crypto";

const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

const passphrase = "strong-passphrase";
const wrongPassphrase = "wrong-passphrase";
const sampleText = "Hello, secret world!";

describe("crypto service", () => {
    it("should encrypt and decrypt text correctly", () => {
        const encrypted = encrypt(sampleText, passphrase);
        const decrypted = decrypt(encrypted, passphrase);
        expect(decrypted).toBe(sampleText);
    });

    it("should return a Buffer of correct length after encryption", () => {
        const encrypted = encrypt(sampleText, passphrase);
        // salt + iv + tag + ciphertext
        expect(encrypted.length).toBeGreaterThan(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    });

    it("should produce different ciphertexts for same input (random salt/iv)", () => {
        const encrypted1 = encrypt(sampleText, passphrase);
        const encrypted2 = encrypt(sampleText, passphrase);
        expect(encrypted1.equals(encrypted2)).toBe(false);
    });

    it("should throw if decrypting with wrong passphrase", () => {
        const encrypted = encrypt(sampleText, passphrase);
        expect(() => decrypt(encrypted, wrongPassphrase)).toThrow();
    });

    it("should throw if encrypted data is tampered (tag)", () => {
        const encrypted = encrypt(sampleText, passphrase);
        // Flip a bit in the tag
        encrypted[SALT_LENGTH + IV_LENGTH] ^= 0xff;
        expect(() => decrypt(encrypted, passphrase)).toThrow();
    });

    it("should throw if encrypted data is tampered (ciphertext)", () => {
        const encrypted = encrypt(sampleText, passphrase);
        // Flip a bit in the ciphertext
        encrypted[SALT_LENGTH + IV_LENGTH + TAG_LENGTH] ^= 0xff;
        expect(() => decrypt(encrypted, passphrase)).toThrow();
    });

    it("should throw if encrypted data is too short", () => {
        const short = Buffer.alloc(10);
        expect(() => decrypt(short, passphrase)).toThrow();
    });

    it("should handle empty string encryption/decryption", () => {
        const encrypted = encrypt("", passphrase);
        const decrypted = decrypt(encrypted, passphrase);
        expect(decrypted).toBe("");
    });

    it("should handle unicode characters", () => {
        const unicodeText = "秘密ノート🚀";
        const encrypted = encrypt(unicodeText, passphrase);
        const decrypted = decrypt(encrypted, passphrase);
        expect(decrypted).toBe(unicodeText);
    });

    it("should handle long text", () => {
        const longText = "a".repeat(10000);
        const encrypted = encrypt(longText, passphrase);
        const decrypted = decrypt(encrypted, passphrase);
        expect(decrypted).toBe(longText);
    });

    it("should not mutate input buffers", () => {
        const encrypted = encrypt(sampleText, passphrase);
        const copy = Buffer.from(encrypted);
        try { decrypt(encrypted, passphrase); } catch {}
        expect(encrypted.equals(copy)).toBe(true);
    });

    it("should throw if auth tag is missing", () => {
        const encrypted = encrypt(sampleText, passphrase);
        // Remove tag bytes
        const tampered = Buffer.concat([
            encrypted.subarray(0, SALT_LENGTH + IV_LENGTH),
            encrypted.subarray( SALT_LENGTH + IV_LENGTH + TAG_LENGTH)
        ]);
        expect(() => decrypt(tampered, passphrase)).toThrow();
    });
});