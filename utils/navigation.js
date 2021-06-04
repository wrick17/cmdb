import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  navigateTransition,
  startNavigationTransition,
} from "../redux/actions/routeActionCreators";

export const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const route = (to) => {
    dispatch(startNavigationTransition());
    setTimeout(() => {
      router.push(to, undefined, { shallow: true });
      dispatch(navigateTransition());
    }, 250);
  };

  return route;
};
