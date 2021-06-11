import { FrameLines } from "@arwes/core";
import { useAnimator } from "../utils/hooks";

const Image = (props) => {
  const { ref, animator } = useAnimator(props);

  const { src, alt = "", style } = props;

  return (
    <div className="image" style={style} ref={ref}>
      <FrameLines animator={animator} hover>
        <div className={`figo ${animator.activate ? "show" : ""}`}>
          <img
            src={src}
            alt={alt}
            className={animator.activate ? "show" : ""}
          />
        </div>
      </FrameLines>
    </div>
  );
};

export default Image;
