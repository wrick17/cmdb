import { expect, test } from "bun:test";
import { buildTmdbUrl } from "./[[path]]";

test("buildTmdbUrl preserves query parameters and owns the API key", () => {
  const url = buildTmdbUrl(
    "https://cmdb.pages.dev/api/search/multi?query=the+matrix&api_key=bad",
    "search/multi",
    "secret",
  );

  expect(url.toString()).toBe(
    "https://api.themoviedb.org/3/search/multi?query=the+matrix&api_key=secret",
  );
  expect(
    buildTmdbUrl("https://cmdb.pages.dev/api/../admin", "../admin", "x"),
  ).toBeNull();
});
