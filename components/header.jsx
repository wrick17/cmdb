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
      <div style={{ textAlign: 'center' }}>
        <Link
          to="/"
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
    </header>
  );
};

export default Header;
