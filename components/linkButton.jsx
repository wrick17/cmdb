import { FrameHexagon } from "@arwes/core";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useNavigation } from "../utils/navigation";
import Button from "./button";

const LinkButton = ({ to, text, children }) => {
  const navigate = useNavigation();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(to);
  }, []);

  return (
    <a href={to} onClick={(e) => e.preventDefault()}>
      <Button
        text={!children && text}
        onClick={() => navigate(to)}
        FrameComponent={FrameHexagon}
      >
        {children}
      </Button>
    </a>
  );
};

export default LinkButton;
