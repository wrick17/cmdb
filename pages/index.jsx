import LinkButton from "../components/linkButton";
import Text from "../components/text";
import { Link } from '../utils/link';

export default function Home() {
  return (
    <div>
      <Text as="h1">Home Page</Text>
      <br />
      <Link to="/hello">
        <Text>Hello page</Text>
      </Link>
      <br />
      <br />
      <LinkButton text="Hello Page" to="/hello" />
    </div>
  );
}
