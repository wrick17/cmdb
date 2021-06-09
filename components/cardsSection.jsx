import { memo } from "react";
import Text from "../ui/text";
import Frame from "../ui/frame";

const CardsSection = memo(({ title, children }) => {
  return (
    <div className="cards-section">
      <div className="section-name">
        <Frame>
          <Text as="h2" style={{ marginBottom: 0 }}>
            {title}
          </Text>
        </Frame>
      </div>
      <div className="section-content">
        <Frame frame="box" className="movies-frame">
          {children}
        </Frame>
      </div>
    </div>
  );
});

export default CardsSection;
