import { describe, expect, test } from "bun:test";
import { formatDate, formatYear, getRandomImage, handleize } from "./utils";

describe("utils", () => {
  test("handleize trims leading and trailing separators", () => {
    expect(handleize(" (Hello World) ")).toBe("hello-world");
  });

  test("formatDate and formatYear format valid values", () => {
    expect(formatDate("2024-12-31")).toBe("31 Dec, 2024");
    expect(formatYear("2024-12-31")).toBe("2024");
  });

  test("getRandomImage always maps to an available placeholder filename", () => {
    const values = Array.from({ length: 200 }, () => getRandomImage());
    for (const value of values) {
      expect(value).toMatch(/^\/placeholders\/\d{2}\.jpg$/);
      const imageNumber = Number(value.match(/\d+/)?.[0]);
      expect(imageNumber).toBeGreaterThanOrEqual(0);
      expect(imageNumber).toBeLessThanOrEqual(9);
    }
  });
});
