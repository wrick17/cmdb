import axios from "axios";

const apiKey = "f4fcbbc0d3afaea558736f65edfdb7ad";
const baseUrl = "https://api.themoviedb.org/3";

const fetch = async (url, method = "GET") => {
  const apiSlug =
    url.replace("/api", "") +
    `${url.indexOf("?") !== -1 ? "&" : "?"}api_key=${apiKey}`;
  const apiUrl = `${baseUrl}${apiSlug}`;

  try {
    const response = await axios({
      method: method,
      url: apiUrl,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

export default fetch;

