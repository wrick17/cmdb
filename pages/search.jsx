import { useEffect, useRef, useState } from "react";
import SearchCard from "../components/searchCard";
import { useSearchService } from "../services/searchServices";
import Input from "../ui/input";
import Text from "../ui/text";
import Loading from "../ui/loading";
import { useRouter } from "next/router";
import Section from "../ui/section";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const initializedFromUrlRef = useRef(false);

  const { search } = useSearchService();

  useEffect(() => {
    if (!router.isReady || initializedFromUrlRef.current) {
      return;
    }
    const urlQuery = router.query.query;
    const nextQuery = Array.isArray(urlQuery)
      ? urlQuery[0] || ""
      : urlQuery || "";
    if (nextQuery) {
      setQuery(nextQuery);
    }
    initializedFromUrlRef.current = true;
  }, [router.isReady, router.query.query]);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const normalizedQuery = query.trim();
    if (normalizedQuery.length > 2) {
      const encodedQuery = encodeURIComponent(normalizedQuery);
      const nextPath = `/search?query=${encodedQuery}`;

      if (router.asPath !== nextPath) {
        router[router.pathname === "/" ? "push" : "replace"](
          nextPath,
          nextPath,
          {
            shallow: true,
          },
        );
      }

      if (router.pathname === "/search") {
        setLoading(true);
        search(normalizedQuery)
          .then((data) => setResults(data.results || []))
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      }
    } else if (normalizedQuery.length === 0) {
      if (router.pathname === "/search" && router.asPath !== "/search") {
        router.replace("/search", "/search", {
          shallow: true,
        });
      }
      setResults(null);
      setLoading(false);
    }
  }, [query, router.asPath, router.isReady, router.pathname, search]);

  const onClear = () => {
    setQuery("");
    setResults(null);
  };

  return (
    <div className="search-page">
      <Input
        type="search"
        className="search-input"
        value={query}
        onChange={setQuery}
        onClear={onClear}
        autoFocus={router?.pathname === "/search"}
        placeholder="Search for Movies, Shows or People"
      />
      <div className="search-results">
        {loading ? (
          <Loading />
        ) : results ? (
          results?.length ? (
            <Section title="Results">
              {results?.map((result) => (
                <SearchCard key={result.id} data={result} />
              ))}
            </Section>
          ) : (
            <div className="no-results">
              <Text>No Results</Text>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Search;
