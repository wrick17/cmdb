import { useEffect, useState } from "react";
import SearchCard from "../components/searchCard";
import { useSearchService } from "../services/searchServices";
import Input from "../ui/input";
import Text from "../ui/text";
import Loading from "../ui/loading";
import { useLocation, useNavigate } from "react-router";
import Section from "../ui/section";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(
    () => new URLSearchParams(location.search).get("query") || "",
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const { search } = useSearchService();

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (normalizedQuery.length > 2) {
      const encodedQuery = encodeURIComponent(normalizedQuery);
      const nextPath = `/search?query=${encodedQuery}`;

      if (`${location.pathname}${location.search}` !== nextPath) {
        navigate(nextPath, { replace: location.pathname === "/search" });
      }

      if (location.pathname === "/search") {
        setLoading(true);
        search(normalizedQuery)
          .then((data) => setResults(data.results || []))
          .catch(() => setResults([]))
          .finally(() => setLoading(false));
      }
    } else if (normalizedQuery.length === 0) {
      if (location.pathname === "/search" && location.search) {
        navigate("/search", { replace: true });
      }
      setResults(null);
      setLoading(false);
    }
  }, [location.pathname, location.search, navigate, query, search]);

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
        autoFocus={location.pathname === "/search"}
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
