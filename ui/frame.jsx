import {
  FrameBox,
  FrameCorners,
  FrameHexagon,
  FrameLines,
  FramePentagon,
  FrameUnderline,
} from "@arwes/core";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";

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
      <FrameComponent animator={animator} hover></FrameComponent>
      <div className="frame-content">{children}</div>
    </div>
  );
});

export default Frame;
