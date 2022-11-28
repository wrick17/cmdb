import fetch from "../utils/fetch";

export const useSearchService = () => {
  const search = (query) => {
    return fetch(`/api/search/multi?query=${query}`);
  };

  return { search };
};

