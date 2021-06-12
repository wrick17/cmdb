import { Text as AText } from "@arwes/core";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";

const Text = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, style, activated, ...rest } = props;

  return (
      <AText
        blink={false}
        animator={{ ...animator, ...(activated && { animate: false }) }}
        style={style}
        {...rest}
      >
        <div ref={ref} className={`figo ${animator.activate ? "show" : ""}`}>
          {children}
        </div>
      </AText>
  );
});

export default Text;
