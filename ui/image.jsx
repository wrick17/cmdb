import { AnimatorGeneralProvider } from "@arwes/animation";
import { ArwesThemeProvider, FrameLines, StylesBaseline } from "@arwes/core";
import { staggerDuration } from "../utils/constants";
import { useAnimator } from "../utils/hooks";

const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const Image = (props) => {
  const { ref, animator } = useAnimator(props);

  const { src, alt = "", style } = props;

  return (
    <div className="image" style={style} ref={ref}>
      <ArwesThemeProvider>
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <StylesBaseline />
          <FrameLines animator={animator} hover>
            <div className={`figo ${animator.activate ? "show" : ""}`}>
              <img src={src} alt={alt} className={animator.activate ? "show" : ""} />
            </div>
          </FrameLines>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
    </div>
  );
};

export default Image;
