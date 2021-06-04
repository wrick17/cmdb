const initialState = {
  routing: false,
};

export const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ROUTE/START_NAVIGATION_TRANSITION": {
      return {
        ...state,
        routing: true,
      };
    }
    case "ROUTE/NAVIGATE": {
      return {
        ...state,
        routing: false,
      };
    }
    default: {
      return state;
    }
  }
};
