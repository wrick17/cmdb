import {
  ArwesThemeProvider,
  StylesBaseline,
  Text,
  Button as AButton,
  FrameBox,
  FrameCorners,
  FramePentagon,
  FrameHexagon,
  FrameUnderline,
  FrameLines,
} from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { useAnimator } from "../utils/hooks";
import { staggerDuration } from "../utils/constants";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const frameMap = {
  box: FrameBox,
  corners: FrameCorners,
  pentagon: FramePentagon,
  hexagon: FrameHexagon,
  underline: FrameUnderline,
  lines: FrameLines,
};

const globalStyles = { body: { fontFamily: FONT_FAMILY_ROOT } };
const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const Button = (props) => {
  const { ref, animator } = useAnimator(props);
  const { text, onClick, containerStyles, frame, ...rest } = props;

  return (
    <span ref={ref} style={containerStyles}>
      <ArwesThemeProvider>
        <StylesBaseline styles={globalStyles} />
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <AButton
            animator={animator}
            onClick={onClick}
            FrameComponent={frameMap[frame]}
            {...rest}
          >
            <Text style={{ whiteSpace: "nowrap" }}>{text}</Text>
          </AButton>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
    </span>
  );
};

export default Button;
