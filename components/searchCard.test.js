import { describe, expect, test } from "bun:test";
import { formatSearchRating, resolveSearchResultDate } from "./searchCard";

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

describe("formatSearchRating", () => {
  test("uses the same integer percentage as movie cards", () => {
    expect(formatSearchRating(8.255)).toBe("82%");
  });

  test("returns NA for a missing rating", () => {
    expect(formatSearchRating(0)).toBe("NA");
  });
});
