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
    <header
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1180px",
        margin: "0 auto 48px",
      }}
    >
      <div>
        <Link
          to="/"
          style={{
            display: "block",
          }}
          ref={ref}
        >
          <Text
            as="h1"
            style={{
              textTransform: "none",
              marginBottom: "0",
            }}
          >
            {text}
          </Text>
        </Link>
      </div>

      <Link
        to="/search"
        className="search-trigger"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          padding: "16px",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <Text>Search</Text>
      </Link>
    </header>
  );
};

export default Header;
