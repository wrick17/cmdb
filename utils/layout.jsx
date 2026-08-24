import { ArwesThemeProvider, StylesBaseline } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { navigateTransition } from "../redux/actions/routeActionCreators";
import { useConfigService } from "../services/configServices";
import { staggerDuration } from "./constants";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const globalStyles = { body: { fontFamily: FONT_FAMILY_ROOT } };
const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const Utils = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { fetchConfig } = useConfigService();

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  useEffect(() => {
    dispatch(navigateTransition());
  }, [dispatch, location.pathname, location.search]);

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
