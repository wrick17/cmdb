import { FramePentagon } from "@arwes/core";
import { useAnimator } from "../utils/hooks";

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
      <FramePentagon animator={animator} hover>
        <div className={`figo ${animator.activate ? "show" : ""}`}>
          {children}
        </div>
      </FramePentagon>
    </div>
  );
};

export default Card;
