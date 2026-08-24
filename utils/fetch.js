import axios from "axios";

let currentController = null;

const fetch = async (url, options = {}, oneInstance) => {
  if (oneInstance) {
    if (currentController) {
      currentController.abort();
    }
    currentController = new AbortController();
  }

  const response = await axios({
    method: "GET",
    url,
    ...(oneInstance ? { signal: currentController.signal } : {}),
    ...options,
  });
  return response.data;
};

export default fetch;
