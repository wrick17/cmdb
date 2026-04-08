import { describe, expect, test } from "bun:test";
import { resolveCardMediaType } from "./movieCard";

describe("resolveCardMediaType", () => {
  test("uses explicit card type when provided", () => {
    expect(resolveCardMediaType("movie", "tv")).toBe("movie");
  });

  test("falls back to data media_type when type is missing", () => {
    expect(resolveCardMediaType(undefined, "tv")).toBe("tv");
  });
});
