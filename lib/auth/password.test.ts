import { describe, expect, it } from "vitest";

import { MIN_PASSWORD_LENGTH, hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("never stores the password in plain text", async () => {
    const hash = await hashPassword("correct horse battery staple");

    expect(hash).not.toContain("correct horse battery staple");
    expect(hash.startsWith("scrypt$")).toBe(true);
    expect(hash.split("$")).toHaveLength(3);
  });

  it("produces a different hash each time (unique salt)", async () => {
    const first = await hashPassword("same-password");
    const second = await hashPassword("same-password");

    expect(first).not.toBe(second);
  });

  it("verifies the correct password", async () => {
    const hash = await hashPassword("s3cret-password");
    await expect(verifyPassword("s3cret-password", hash)).resolves.toBe(true);
  });

  it("rejects the wrong password", async () => {
    const hash = await hashPassword("s3cret-password");
    await expect(verifyPassword("s3cret-passwerd", hash)).resolves.toBe(false);
  });

  it("rejects malformed or missing stored hashes", async () => {
    await expect(verifyPassword("anything", null)).resolves.toBe(false);
    await expect(verifyPassword("anything", undefined)).resolves.toBe(false);
    await expect(verifyPassword("anything", "not-a-hash")).resolves.toBe(false);
    await expect(verifyPassword("anything", "bcrypt$abc$def")).resolves.toBe(false);
  });

  it("requires a documented minimum length", () => {
    expect(MIN_PASSWORD_LENGTH).toBeGreaterThanOrEqual(8);
  });
});
