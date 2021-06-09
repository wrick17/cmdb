import { AnimatorGeneralProvider } from "@arwes/animation";
import {
  ArwesThemeProvider,
  FrameBox,
  FrameCorners,
  FrameHexagon,
  FrameLines,
  FramePentagon,
  FrameUnderline,
  StylesBaseline,
} from "@arwes/core";
import { memo } from "react";
import { staggerDuration } from "../utils/constants";
import { useAnimator } from "../utils/hooks";
const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const frameMap = {
  box: FrameBox,
  corners: FrameCorners,
  pentagon: FramePentagon,
  hexagon: FrameHexagon,
  underline: FrameUnderline,
  lines: FrameLines,
};

const Frame = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, className, frame = "corners" } = props;

  const FrameComponent = frameMap[frame];

  return (
    <div className={`frame ${className}`} ref={ref}>
      <ArwesThemeProvider>
        <StylesBaseline />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <FrameComponent animator={animator}></FrameComponent>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
      <div className="frame-content">{children}</div>
    </div>
  );
});

export default Frame;
