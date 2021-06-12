import { memo } from "react";
import Section from "../ui/section";

const CardsSection = memo(({ title, children }) => {
  return (
    <Section title={title} className="">
      {children}
    </Section>
  );
});

export default CardsSection;
