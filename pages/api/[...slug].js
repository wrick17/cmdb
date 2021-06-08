import axios from "axios";

const apiKey = "f4fcbbc0d3afaea558736f65edfdb7ad";
const baseUrl = "https://api.themoviedb.org/3";

export default async ({ url, method }, res) => {
  const apiSlug = url.replace("/api", "") + `?api_key=${apiKey}`;
  const apiUrl = `${baseUrl}${apiSlug}`;

  try {
    const response = await axios({
      method: method,
      url: apiUrl,
    });
    return res.status(200).json(response.data);
  } catch (err) {
    const {
      response: { status, data },
    } = err;
    return res.status(status).json(data);
  }
};
