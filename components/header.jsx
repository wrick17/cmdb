import { useEffect, useRef, useState } from "react";
import Text from "../ui/text";
import Link from "../utils/link";

const Header = () => {
  const [text, setText] = useState("CMDb");
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      const mouseEnterHandler = () => {
        setText("Cyber Movie Database");
      };
      ref.current.addEventListener("mouseenter", mouseEnterHandler);
      const mouseLeaveHandler = () => {
        setText("CMDb");
      };
      ref.current.addEventListener("mouseleave", mouseLeaveHandler);
      return () => {
        ref.current.removeEventListener("mouseenter", mouseEnterHandler);
        ref.current.removeEventListener("mouseleave", mouseLeaveHandler);
      };
    }
  }, []);

  return (
    <Link
      to="/"
      style={{
        display: "block",
        textAlign: "center",
        margin: "0 auto 48px",
        borderBottom: "1px solid",
        width: "80%",
        maxWidth: "800px",
      }}
      ref={ref}
    >
      <Text
        as="h1"
        style={{ textAlign: "center", textTransform: "none" }}
        stagger={1000}
      >
        {text}
      </Text>
    </Link>
  );
};

export default Header;
