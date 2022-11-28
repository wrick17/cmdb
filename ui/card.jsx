import Link from 'next/link';
import { memo } from "react";
import { useAnimator } from "../utils/hooks";

const Card = memo((props) => {
  const { ref, animator } = useAnimator(props);
  const { className, children, onClick, href, ...rest } = props;

  const Component = href ? Link : 'div';

  return (
    <Component
      className={`border ${animator.activate ? "show" : ""} ${className}`}
      ref={ref}
      href={href}
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
    </Component>
  );
});

export default Card;

