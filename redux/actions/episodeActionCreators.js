export const loadEpisodeDetails = () => ({
  type: "EPISODE/LOAD_DETAILS",
});

export const setEpisodeDetails = (payload) => ({
  type: "EPISODE/SET_DETAILS",
  payload,
});
