import { combineReducers } from "redux";
import { configReducer } from "./configReducer";
import { homeReducer } from "./homeReducer";
import { movieReducer } from "./movieReducer";
import { routeReducer } from "./routeReducer";
import { tvReducer } from "./tvReducer";

const rootReducer = combineReducers({
  home: homeReducer,
  route: routeReducer,
  config: configReducer,
  movie: movieReducer,
  tv: tvReducer,
});

export default rootReducer;
