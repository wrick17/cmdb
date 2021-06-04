import {
  ArwesThemeProvider,
  StylesBaseline,
  Text,
  Button as AButton,
} from "@arwes/core";
import { BleepsProvider } from "@arwes/sounds";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { useSelector } from "react-redux";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const SOUND_ASSEMBLE_URL =
  "https://playground.arwes.dev/assets/sounds/assemble.mp3";
const SOUND_TYPE_URL = "https://playground.arwes.dev/assets/sounds/type.mp3";
const SOUND_CLICK_URL = "https://playground.arwes.dev/assets/sounds/click.mp3";

const globalStyles = { body: { fontFamily: FONT_FAMILY_ROOT } };
const animatorGeneral = { duration: { enter: 200, exit: 200 } };
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

const Button = ({ text, onClick, ...props }) => {
  const route = useSelector((state) => state.route);

  return (
    <ArwesThemeProvider>
      <StylesBaseline styles={globalStyles} />
      <BleepsProvider
        audioSettings={audioSettings}
        playersSettings={playersSettings}
        bleepsSettings={bleepsSettings}
      >
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <AButton
            animator={{ activate: !route.routing }}
            onClick={onClick}
            {...props}
          >
            <Text>{text}</Text>
          </AButton>
        </AnimatorGeneralProvider>
      </BleepsProvider>
    </ArwesThemeProvider>
  );
};

export default Button;
