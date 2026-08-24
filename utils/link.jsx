import { forwardRef } from "react";
import { useNavigation } from "./navigation";

const Link = forwardRef(
  ({ to, children, onClick, style, target, ...props }, ref) => {
    const navigate = useNavigation();

    return (
      <a
        {...props}
        ref={ref}
        href={to}
        onClick={(e) => {
          onClick?.(e);
          if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            target === "_blank"
          ) {
            return;
          }
          e.preventDefault();
          navigate(to);
        }}
        target={target}
        style={{ cursor: "pointer", ...style }}
      >
        {children}
      </a>
    );
  },
);

export default Link;
