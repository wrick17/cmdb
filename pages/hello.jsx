import LinkButton from "../components/linkButton";
import Text from '../components/text';

const Hello = () => {
  return (
    <div>
      <Text as="h1">Hello Page</Text>
      <br />
      <LinkButton text="Home Page" to="/" />
    </div>
  );
};

export default Hello;
