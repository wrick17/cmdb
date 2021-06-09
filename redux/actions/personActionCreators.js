export const loadPersonDetails = () => ({
  type: "PERSON/LOAD_DETAILS",
});

export const setPersonDetails = (payload) => ({
  type: "PERSON/SET_DETAILS",
  payload,
});
