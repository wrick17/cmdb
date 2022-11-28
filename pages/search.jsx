import { useEffect, useState } from "react";
import SearchCard from "../components/searchCard";
import { useSearchService } from "../services/searchServices";
import Input from "../ui/input";
import Text from "../ui/text";
import Loading from "../ui/loading";
import { useRouter } from "next/router";
import Section from "../ui/section";

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router?.query?.query);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const { search } = useSearchService();

  useEffect(() => {
    if (router.query.query !== query) {
      setQuery(router.query.query);
    }
  }, [router.query.query]);

  useEffect(() => {
    if (query?.length > 2) {
      router[router?.pathname === "/" ? "push" : "replace"](
        `/search?query=${query}`,
        `/search?query=${query}`,
        {
          shallow: true,
        }
      );
      if (router?.pathname === "/search") {
        setLoading(true);
        search(query)
          .then((data) => setResults(data.results))
          .catch(() => {})
          .finally(() => setLoading(false));
      }
    } else if (query?.length === 0 && router.pathname === "/search") {
      router.push("/", "/", { shallow: true });
    }
  }, [query]);

  const onClear = () => {
    setQuery("");
    setResults();
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

