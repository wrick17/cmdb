const initalState = {
  loading: false,
};

export const configReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CONFIG/GET_CONFIG": {
      return {
        ...(state || {}),
        loading: true,
      };
    }
    case "CONFIG/SET_CONFIG": {
      return {
        ...(state || {}),
        ...action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
