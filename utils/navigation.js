import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { startNavigationTransition } from "../redux/actions/routeActionCreators";

export const useNavigation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const navigate = (to) => {
    dispatch(startNavigationTransition());
    setTimeout(() => {
      router.push(to, undefined, { shallow: true });
    }, 250);
  };

  return navigate;
};
