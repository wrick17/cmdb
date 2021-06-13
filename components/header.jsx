import Text from "../ui/text";
import Link from "../utils/link";

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
      <div>
        <Link
          to="/"
          style={{
            display: "block",
          }}
        >
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
