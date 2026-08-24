import { Animator, FrameLines } from "@arwes/react";
import { memo } from "react";
import { useAnimator } from "../utils/hooks";
import { staggerDuration } from "../utils/constants";

const Image = memo((props) => {
  const { ref, animator } = useAnimator(props);

  const { src, alt = "", style } = props;

  return (
    <div className="image" style={style} ref={ref}>
      <Animator
        active={animator.activate}
        duration={{
          enter: staggerDuration / 1000,
          exit: staggerDuration / 1000,
        }}
      >
        <FrameLines className="cmdb-frame-svg" />
        <div
          className={`image-content figo ${animator.activate ? "show" : ""}`}
        >
          <img
            src={src}
            alt={alt}
            className={animator.activate ? "show" : ""}
          />
        </div>
      </Animator>
    </div>
  );
});

export default Image;
