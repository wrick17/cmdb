import { memo } from "react";
import { useAnimator } from "../utils/hooks";

const Card = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { className, children, onClick, ...rest } = props;

  return (
    <div
      className={`border ${animator.activate ? "show" : ""} ${className}`}
      ref={ref}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      {...rest}
    >
      <div className={`figo ${animator.activate ? "show" : ""}`}>
        {children}
      </div>
    </div>
  );
});

export default Card;
