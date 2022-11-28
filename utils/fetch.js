import axios from "axios";

export const apiKey = "f4fcbbc0d3afaea558736f65edfdb7ad";
export const baseUrl = "https://api.themoviedb.org/3";

let cancelTokenSource = null;

const fetch = async (url, options = {}, oneInstance) => {
  const apiSlug =
    url.replace("/api", "") +
    `${url.indexOf("?") !== -1 ? "&" : "?"}api_key=${apiKey}`;
  const apiUrl = `${baseUrl}${apiSlug}`;

  if (oneInstance) {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    cancelTokenSource = axios.CancelToken.source();
  }

  try {
    const response = await axios({
      method: "GET",
      url: apiUrl,
      ...(oneInstance ? { cancelToken: cancelTokenSource.token } : {}),
      ...options,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default fetch;

