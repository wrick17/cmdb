import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startNavigationTransition } from "../redux/actions/routeActionCreators";
import { staggerDuration } from "./constants";

export const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigate = (to) => {
    dispatch(startNavigationTransition());
    setTimeout(() => {
      router.push(to, to, { shallow: true });
      scrollTo(0, 0);
    }, staggerDuration);
  };

  return navigate;
};
