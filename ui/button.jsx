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
import { BleepsProvider } from "@arwes/sounds";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { assetsBaseUrl, staggerDuration } from "../utils/constants";
import { useAnimator } from "../utils/hooks";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_ASSEMBLE_URL = `${assetsBaseUrl}/assets/sounds/assemble.mp3`;
const SOUND_TYPE_URL = `${assetsBaseUrl}/assets/sounds/type.mp3`;
const SOUND_CLICK_URL = `${assetsBaseUrl}/assets/sounds/click.mp3`;

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
const audioSettings = { common: { volume: 0.25 } };
const playersSettings = {
  assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
  type: { src: [SOUND_TYPE_URL], loop: true },
  click: { src: [SOUND_CLICK_URL] },
};
const bleepsSettings = {
  assemble: { player: "assemble" },
  type: { player: "type" },
  click: { player: "click" },
};

const Button = (props) => {
  const { ref, animator } = useAnimator(props);
  const { text, onClick, containerStyles, frame, ...rest } = props;

  return (
    <span ref={ref} style={containerStyles}>
      <ArwesThemeProvider>
        <StylesBaseline styles={globalStyles} />
        <BleepsProvider
          audioSettings={audioSettings}
          playersSettings={playersSettings}
          bleepsSettings={bleepsSettings}
        >
          <AnimatorGeneralProvider animator={animatorGeneral}>
            <AButton
              animator={animator}
              onClick={onClick}
              FrameComponent={frameMap[frame]}
              {...rest}
            >
              <Text style={{ whiteSpace: 'nowrap' }} >{text}</Text>
            </AButton>
          </AnimatorGeneralProvider>
        </BleepsProvider>
      </ArwesThemeProvider>
    </span>
  );
};

export default Button;
