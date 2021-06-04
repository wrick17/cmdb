import { combineReducers } from "redux";
import { homeReducer } from "./homeReducer";
import { routeReducer } from './routeReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  route: routeReducer,
});

export default rootReducer;
