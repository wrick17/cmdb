import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const useSearchService = () => {
  const search = (query) => {
    return axios
      .get("/api/search/multi", {
        cancelToken: source.token,
        params: {
          query,
        },
      })
      .then((res) => res.data);
  };

  return { search };
};
