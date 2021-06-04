const initialState = { loading: true };

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOME/LOAD_HOME": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
