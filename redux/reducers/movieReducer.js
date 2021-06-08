const initialState = { loading: false };

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MOVIE/LOAD_DETAILS": {
      return {
        loading: true,
      };
    }
    case "MOVIE/SET_DETAILS": {
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
