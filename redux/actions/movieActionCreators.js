export const loadMovieDetails = () => ({
  type: "MOVIE/LOAD_DETAILS",
});

export const setMovieDetails = (payload) => ({
  type: "MOVIE/SET_DETAILS",
  payload,
});
