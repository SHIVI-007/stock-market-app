import { afterEach, describe, expect, it } from "vitest";

import { adminEmails, isAdmin, isAdminEmail, isAdminRole } from "./roles";

const originalAdminEmails = process.env.ADMIN_EMAILS;

afterEach(() => {
  if (originalAdminEmails === undefined) {
    delete process.env.ADMIN_EMAILS;
  } else {
    process.env.ADMIN_EMAILS = originalAdminEmails;
  }
});

describe("admin allowlist", () => {
  it("is empty when ADMIN_EMAILS is unset", () => {
    delete process.env.ADMIN_EMAILS;
    expect(adminEmails()).toEqual([]);
    expect(isAdminEmail("anyone@example.com")).toBe(false);
  });

  it("parses a comma-separated list", () => {
    process.env.ADMIN_EMAILS = "first@example.com, second@example.com";
    expect(adminEmails()).toEqual(["first@example.com", "second@example.com"]);
  });

  it("ignores blank entries and trims whitespace", () => {
    process.env.ADMIN_EMAILS = " , boss@example.com ,, ";
    expect(adminEmails()).toEqual(["boss@example.com"]);
  });

  it("matches case-insensitively", () => {
    process.env.ADMIN_EMAILS = "Boss@Example.com";
    expect(isAdminEmail("boss@example.COM")).toBe(true);
    expect(isAdminEmail("  boss@example.com  ")).toBe(true);
  });

  it("does not match an address that is not listed", () => {
    process.env.ADMIN_EMAILS = "boss@example.com";
    expect(isAdminEmail("someone-else@example.com")).toBe(false);
  });
});

describe("isAdmin", () => {
  it("is true only for the ADMIN role", () => {
    expect(isAdmin({ role: "ADMIN" })).toBe(true);
    expect(isAdmin({ role: "LEARNER" })).toBe(false);
  });

  it("handles a missing user", () => {
    expect(isAdmin(null)).toBe(false);
    expect(isAdmin(undefined)).toBe(false);
  });
});

describe("isAdminRole", () => {
  it("narrows the role string", () => {
    expect(isAdminRole("ADMIN")).toBe(true);
    expect(isAdminRole("LEARNER")).toBe(false);
    expect(isAdminRole(undefined)).toBe(false);
    expect(isAdminRole(42)).toBe(false);
  });
});
