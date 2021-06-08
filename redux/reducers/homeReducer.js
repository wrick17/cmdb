const initialState = { loading: false };

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOME/LOAD_HOME": {
      return {
        loading: true,
      };
    }
    case "HOME/SET_HOME": {
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
