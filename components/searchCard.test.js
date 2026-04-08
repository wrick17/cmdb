import { describe, expect, test } from "bun:test";
import { resolveSearchResultDate } from "./searchCard";

describe("resolveSearchResultDate", () => {
  test("prefers movie release_date when available", () => {
    expect(
      resolveSearchResultDate({
        release_date: "2022-03-01",
        first_air_date: "2010-01-01",
      }),
    ).toBe("2022-03-01");
  });

  test("falls back to first_air_date for TV results", () => {
    expect(
      resolveSearchResultDate({
        release_date: undefined,
        first_air_date: "2008-07-20",
      }),
    ).toBe("2008-07-20");
  });
});
