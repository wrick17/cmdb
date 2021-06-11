import { ArwesThemeProvider, StylesBaseline } from '@arwes/core';
import { AnimatorGeneralProvider } from "@arwes/animation";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { navigateTransition } from "../redux/actions/routeActionCreators";
import { useConfigService } from "../services/configServices";
import { useNavigation } from "./navigation";
import { staggerDuration } from './constants';

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const globalStyles = { body: { fontFamily: FONT_FAMILY_ROOT } };
const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

if (typeof window === "undefined") {
  const error = console.error;
  console.error = (...args) => {
    if (typeof args?.[0] === "string" && !args?.[0]?.startsWith("Warning")) {
      error(...args);
    }
  };
}

const Utils = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const { fetchConfig } = useConfigService();

  useEffect(() => {
    router.beforePopState(({ as }) => {
      navigate(as);
      return false;
    });

    Router.events.on("routeChangeComplete", () => {
      dispatch(navigateTransition());
    });

    fetchConfig();
  }, []);

  return (
    <>
      <ArwesThemeProvider>
        <StylesBaseline styles={globalStyles} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          {children}
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
    </>
  );
};

export default Utils;
