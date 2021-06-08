const initialState = { loading: false };

export const tvReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TV/LOAD_DETAILS": {
      return {
        loading: true,
      };
    }
    case "TV/SET_DETAILS": {
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
