import Frame from "./frame";
import Text from "./text";

const Section = ({ title, children }) => {
  return (
    <div className="section">
      <Frame frame="box" className="section-frame">
        {children}
      </Frame>
      <Frame frame="hexagon" className="section-title">
        <Text as="h6" className="secton-title-text">
          <a>{title}</a>
        </Text>
      </Frame>
    </div>
  );
};

export default Section;
