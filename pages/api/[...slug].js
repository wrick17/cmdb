import axios from "axios";

const apiKey = "f4fcbbc0d3afaea558736f65edfdb7ad";
const baseUrl = "https://api.themoviedb.org/3";

export default async ({ url, method }, res) => {
  const apiSlug =
    url.replace("/api", "") +
    `${url.indexOf("?") !== -1 ? "&" : "?"}api_key=${apiKey}`;
  const apiUrl = `${baseUrl}${apiSlug}`;

  try {
    const response = await axios({ method, url: apiUrl });
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=3600",
    );
    return res.status(200).json(response.data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const data = err?.response?.data || {
      status_message: "Upstream request failed",
    };
    return res.status(status).json(data);
  }
};
