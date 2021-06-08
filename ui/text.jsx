import { AnimatorGeneralProvider } from "@arwes/animation";
import { ArwesThemeProvider, StylesBaseline, Text as AText } from "@arwes/core";
import { memo } from "react";
import { staggerDuration } from "../utils/constants";
import { useAnimator } from "../utils/hooks";

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const Text = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, style, containerStyles, activated, stagger, ...rest } =
    props;

  return (
    <span ref={ref} style={{ ...containerStyles }}>
      <ArwesThemeProvider>
        <StylesBaseline
          styles={{
            body: { fontFamily: FONT_FAMILY_ROOT },
          }}
        />
        <AnimatorGeneralProvider
          animator={
            stagger
              ? {
                  duration: {
                    enter: stagger,
                    exit: stagger,
                  },
                }
              : animatorGeneral
          }
        >
          <AText
            blink={false}
            animator={{ ...animator, ...(activated && { animate: false }) }}
            style={style}
            {...rest}
          >
            <div className={`figo ${animator.activate ? "show" : ""}`}>
              {children}
            </div>
          </AText>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
    </span>
  );
});

export default Text;
