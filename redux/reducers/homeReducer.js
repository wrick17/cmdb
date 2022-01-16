const initialState = { loading: false };

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HOME/LOAD_HOME": {
      const homeData = JSON.parse(localStorage.getItem("home")) || null
      return {
        ...homeData,
        loading: !homeData,
      };
    }
    case "HOME/SET_HOME": {
      localStorage.setItem('home', JSON.stringify(action.payload));
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
