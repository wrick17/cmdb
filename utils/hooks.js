import { useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { useSelector } from "react-redux";

export const useAnimator = (props) => {
  const ref = useRef();

  const { routing } = useSelector((state) => state.route);
  const { inViewport } = useInViewport(
    ref,
    null,
    { disconnectOnLeave: false },
    props
  );

  return {
    ref,
    animator: {
      activate: !routing && inViewport,
      animate: props.activated ? false : true,
    },
    inViewport,
  };
};
