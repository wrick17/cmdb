import LinkButton from "../components/linkButton";
import Text from "../components/text";

export default function Home() {
  return (
    <div>
      <Text as="h1">Home Page</Text>
      <br />
      <LinkButton text="Hello Page" to="/hello" />
    </div>
  );
}
