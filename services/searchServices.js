import axios from "axios";

let cancelTokenSource = null;
export const useSearchService = () => {

  const search = (query) => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    cancelTokenSource = axios.CancelToken.source();
    return axios
      .get(
        "/api/search/multi",
        {
          params: {
            query,
          },
          cancelToken: cancelTokenSource.token,
        },
        {}
      )
      .then((res) => res.data);
  };

  return { search };
};
