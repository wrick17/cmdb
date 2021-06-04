import { useRouter } from "next/router";
import { useEffect } from "react";
import { useNavigation } from "./navigation";

export const Link = ({ to, children }) => {
  const navigate = useNavigation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(to);
  }, []);

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
