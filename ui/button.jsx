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

const Button = memo((props) => {
  const {
    text,
    onClick,
    containerStyles,
    frame,
    activated = false,
    onEnterViewport,
    onLeaveViewport,
    ...rest
  } = props;
  const { ref, animator } = useAnimator({
    onEnterViewport,
    onLeaveViewport,
  });
  const FrameComponent = frameMap[frame] || FrameCorners;

  return (
    <span ref={ref} style={containerStyles}>
      <Animator
        active={animator.activate}
        disabled={activated}
        duration={{
          enter: staggerDuration / 1000,
          exit: staggerDuration / 1000,
        }}
      >
        <button
          type="button"
          className="cmdb-button"
          onClick={onClick}
          {...rest}
        >
          <FrameComponent className="cmdb-button-frame" />
          <span className="cmdb-button-content">{text}</span>
        </button>
      </Animator>
    </span>
  );
});

export default Button;
