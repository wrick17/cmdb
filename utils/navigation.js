import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startNavigationTransition } from "../redux/actions/routeActionCreators";
import { staggerDuration } from "./constants";

export const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigate = useCallback(
    (to) => {
      dispatch(startNavigationTransition());
      router.push(to, to, { shallow: true });
      setTimeout(() => {
        scrollTo(0, 0);
      }, staggerDuration);
    },
    [dispatch, router],
  );

  return navigate;
};
