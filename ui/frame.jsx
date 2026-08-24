import {
  Animator,
  FrameCorners,
  FrameLines,
  FrameOctagon,
  FrameUnderline,
} from "@arwes/react";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";
import { staggerDuration } from "../utils/constants";

const frameMap = {
  box: FrameCorners,
  corners: FrameCorners,
  pentagon: FrameCorners,
  hexagon: FrameOctagon,
  underline: FrameUnderline,
  lines: FrameLines,
};

const Frame = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, className, frame = "corners" } = props;

  const FrameComponent = frameMap[frame];

  return (
    <div className={`frame ${className}`} ref={ref}>
      <Animator
        active={animator.activate}
        duration={{
          enter: staggerDuration / 1000,
          exit: staggerDuration / 1000,
        }}
      >
        <FrameComponent className="cmdb-frame-svg" />
      </Animator>
      <div className="frame-content">{children}</div>
    </div>
  );
});

export default Frame;
