import {
  Text,
  Button as AButton,
  FrameBox,
  FrameCorners,
  FramePentagon,
  FrameHexagon,
  FrameUnderline,
  FrameLines,
} from "@arwes/core";
import { useAnimator } from "../utils/hooks";

const frameMap = {
  box: FrameBox,
  corners: FrameCorners,
  pentagon: FramePentagon,
  hexagon: FrameHexagon,
  underline: FrameUnderline,
  lines: FrameLines,
};

const Button = (props) => {
  const { ref, animator } = useAnimator(props);
  const { text, onClick, containerStyles, frame, ...rest } = props;

  return (
    <span ref={ref} style={containerStyles}>
      <AButton
        animator={animator}
        onClick={onClick}
        FrameComponent={frameMap[frame]}
        {...rest}
      >
        <Text style={{ whiteSpace: "nowrap" }}>{text}</Text>
      </AButton>
    </span>
  );
};

export default Button;
