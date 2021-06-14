const initialState = { loading: false };

export const episodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EPISODE/LOAD_DETAILS": {
      return {
        ...state,
        loading: true,
      };
    }
    case "EPISODE/SET_DETAILS": {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
