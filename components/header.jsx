import Text from "../ui/text";
import Link from "../utils/link";
import SearchIcon from "./searchIcon";

const Header = () => {
  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1180px",
        margin: "0 auto 48px",
      }}
    >
      <Link to="/">
        <Text
          as="h1"
          style={{
            textTransform: "none",
            marginBottom: "0",
          }}
        >
          CMDb
        </Text>
      </Link>

      <Link to="/search">
        <span
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <SearchIcon />
        </span>
      </Link>
    </header>
  );
};

export default Header;

