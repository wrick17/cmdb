import { Text as AText } from "@arwes/core";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";

const Text = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { children, style, activated, as, ...rest } = props;
  const inlineWrapper = [
    "p",
    "span",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ].includes(as || "span");
  const Wrapper = inlineWrapper ? "span" : "div";

  return (
    <AText
      blink={false}
      animator={{ ...animator, ...(activated && { animate: false }) }}
      style={style}
      as={as}
      {...rest}
    >
      <Wrapper ref={ref} className={`figo ${animator.activate ? "show" : ""}`}>
        {children}
      </Wrapper>
    </AText>
  );
});

export default Text;
