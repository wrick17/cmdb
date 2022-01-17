import CardsList from "./cardsList";
import CardsSection from "./cardsSection";

const DiscoverSection = ({ sectionData = {}, type }) => {
  const { label, data } = sectionData;

  return label ? (
    <CardsSection title={label}>
      <CardsList data={data.results} type={type} />
    </CardsSection>
  ) : null;
};

export default DiscoverSection;
