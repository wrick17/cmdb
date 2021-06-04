import { useNavigation } from "../utils/navigation";
import Button from "./button";

const LinkButton = ({ to, text, children }) => {
  const route = useNavigation();
  return (
    <a href={to} onClick={(e) => e.preventDefault()}>
      <Button text={!children && text} onClick={() => route(to)}>
        {children}
      </Button>
    </a>
  );
};

export default LinkButton;
