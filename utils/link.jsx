import { useRouter } from "next/router";
import { forwardRef, useEffect } from "react";
import { useNavigation } from "./navigation";

const Link = forwardRef(({ to, children, style }, ref) => {
  const navigate = useNavigation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(to);
  }, []);

  return (
    <a
      ref={ref}
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      style={style}
    >
      {children}
    </a>
  );
});

export default Link;