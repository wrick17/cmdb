import Text from "../ui/text";
import Link from "../utils/link";
import SearchIcon from "./searchIcon";

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="CMDb home">
        <Text
          as="h1"
          style={{
            textTransform: "none",
            marginBottom: "0",
          }}
        >
          CMDb
        </Text>
        <span className="brand-signal" aria-hidden="true">
          // archive
        </span>
      </Link>

      <Link to="/search" className="header-search" aria-label="Search CMDb">
        <SearchIcon />
      </Link>
    </header>
  );
};

export default Header;
