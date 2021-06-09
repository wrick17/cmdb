const initialState = { loading: false };

export const personReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PERSON/LOAD_DETAILS": {
      return {
        ...state,
        loading: true,
      };
    }
    case "PERSON/SET_DETAILS": {
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
