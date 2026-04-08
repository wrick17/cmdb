import fetch from "../utils/fetch";
import { useCallback } from "react";

export const useSearchService = () => {
  const search = useCallback(
    (query) => fetch(`/api/search/multi?query=${query}`, {}, true),
    [],
  );

  return { search };
};
