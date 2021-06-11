import { Text as AText } from "@arwes/core";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";

const Text = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, style, containerStyles, activated, ...rest } = props;

  return (
    <span ref={ref} style={{ ...containerStyles }}>
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
    </span>
  );
});

export default Text;
