import { Animator, Text as ArwesText } from "@arwes/react";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";
import { staggerDuration } from "../utils/constants";

const Text = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, className, ...rest } = props;

  return (
    <Animator
      active={animator.activate}
      duration={{ enter: staggerDuration / 1000, exit: staggerDuration / 1000 }}
    >
      <ArwesText
        className={`cmdb-text ${className || ""}`}
        elementRef={ref}
        fixed
        blink={false}
        hideOnExited={false}
        {...rest}
      >
        {children}
      </ArwesText>
    </Animator>
  );
});

export default Text;
