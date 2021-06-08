import { ArwesThemeProvider, FramePentagon } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { staggerDuration } from "../utils/constants";
import { useAnimator } from "../utils/hooks";

const animatorGeneral = {
  duration: { enter: staggerDuration, exit: staggerDuration },
};

const Card = (props) => {
  const { ref, animator } = useAnimator(props);
  const { className, children, onClick, ...rest } = props;

  return (
    <div
      className={className}
      ref={ref}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      {...rest}
    >
      <ArwesThemeProvider>
        <AnimatorGeneralProvider animator={animatorGeneral}>
          <FramePentagon animator={animator} hover>
            <div className={`figo ${animator.activate ? "show" : ""}`}>{children}</div>
          </FramePentagon>
        </AnimatorGeneralProvider>
      </ArwesThemeProvider>
    </div>
  );
};

export default Card;
