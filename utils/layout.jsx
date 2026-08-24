import {
  Animator,
  AnimatorGeneralProvider,
  GridLines,
  MovingLines,
} from "@arwes/react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { navigateTransition } from "../redux/actions/routeActionCreators";
import { useConfigService } from "../services/configServices";
import { staggerDuration } from "./constants";

const animationDuration = {
  enter: staggerDuration / 1000,
  exit: staggerDuration / 1000,
};

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
};

const SciFiBackground = () => {
  const reducedMotion = useReducedMotion();

  return (
    <Animator active duration={animationDuration}>
      <div className="cmdb-background" aria-hidden="true">
        <GridLines
          className="cmdb-background-grid"
          lineColor="#00f8f80d"
          distance={80}
        />
        {!reducedMotion && (
          <MovingLines
            className="cmdb-background-lines"
            lineColor="#00f8f81a"
            distance={100}
            sets={6}
          />
        )}
      </div>
    </Animator>
  );
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
    <AnimatorGeneralProvider duration={animationDuration}>
      <SciFiBackground />
      {children}
    </AnimatorGeneralProvider>
  );
};

export default Utils;
