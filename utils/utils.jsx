import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { navigateTransition } from "../redux/actions/routeActionCreators";
import { useNavigation } from "./navigation";

const Utils = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      navigate(as);
      return false;
    });

    Router.events.on("routeChangeComplete", () => {
      dispatch(navigateTransition());
    });
  }, []);

  return children;
};

export default Utils;
