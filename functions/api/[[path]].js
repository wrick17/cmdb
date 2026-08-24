const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=3600";

export const buildTmdbUrl = (requestUrl, path, apiKey) => {
  if (!path || !/^[\w-]+(?:\/[\w-]+)*$/.test(path)) return null;

  const url = new URL(path, TMDB_BASE_URL);
  url.search = new URL(requestUrl).search;
  url.searchParams.set("api_key", apiKey);
  return url;
};

const jsonError = (message, status) =>
  Response.json(
    { status_message: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );

export const onRequestGet = async ({ env, params, request, waitUntil }) => {
  if (!env.TMDB_API_KEY)
    return jsonError("TMDb API key is not configured", 500);

  const path = Array.isArray(params.path) ? params.path.join("/") : params.path;
  const apiUrl = buildTmdbUrl(request.url, path, env.TMDB_API_KEY);
  if (!apiUrl) return jsonError("Invalid API path", 400);

  const cache = caches.default;
  const cached = await cache.match(request);
  if (cached) {
    const response = new Response(cached.body, cached);
    response.headers.set("X-Cache", "HIT");
    return response;
  }

  try {
    const upstream = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    });
    const response = new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Cache-Control": upstream.ok ? CACHE_CONTROL : "no-store",
        "Content-Type":
          upstream.headers.get("Content-Type") || "application/json",
        "X-Cache": "MISS",
      },
    });

    if (upstream.ok) waitUntil(cache.put(request, response.clone()));
    return response;
  } catch {
    return jsonError("Upstream request failed", 502);
  }
};
