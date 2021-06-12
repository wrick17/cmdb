import { useEffect, useState } from "react";
import SearchCard from "../components/searchCard";
import { useSearchService } from "../services/searchServices";
import Input from "../ui/input";
import Text from "../ui/text";
import Loading from "../ui/loading";
import { useRouter } from "next/router";
import Section from "../ui/section";

const Search = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const { search } = useSearchService();
  const router = useRouter();

  useEffect(() => {
    if (router.query.query !== query) {
      setQuery(router.query.query);
    }
  }, [router.query.query]);

  useEffect(() => {
    if (query?.length > 2) {
      setLoading(true);
      router.replace(`/search?query=${query}`, `/search?query=${query}`, {
        shallow: true,
      });
      search(query)
        .then((data) => setResults(data.results))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [query, router.query.query]);

  const onClear = () => {
    setQuery("");
    setResults();
    router.replace("/search", "/search", {
      shallow: true,
    });
  };

  return (
    <div className="search-page">
      <Text as="h6" style={{ textAlign: "center" }}>
        Search
      </Text>
      <Input
        type="search"
        className="search-input"
        value={query}
        onChange={setQuery}
        onClear={onClear}
        autoFocus
        placeholder="Search for Movies, TV Shows or just people..."
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
        ) : (
          <div className="no-results">
            <Text>Search for something</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
