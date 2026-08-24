import { useNavigate } from "react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startNavigationTransition } from "../redux/actions/routeActionCreators";
import { staggerDuration } from "./constants";

export const useNavigation = () => {
  const navigateRoute = useNavigate();
  const dispatch = useDispatch();

  const navigate = useCallback(
    (to) => {
      dispatch(startNavigationTransition());
      navigateRoute(to);
      setTimeout(() => {
        scrollTo(0, 0);
      }, staggerDuration);
    },
    [dispatch, navigateRoute],
  );

  return navigate;
};
