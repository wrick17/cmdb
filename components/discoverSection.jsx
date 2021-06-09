import CardsList from "./cardsList";
import CardsSection from "./cardsSection";
import MovieCard from "./movieCard";

const DiscoverSection = ({ sectionData = {}, type }) => {
  const { label, data } = sectionData;

  return label ? (
    <CardsSection title={label}>
      <CardsList card={MovieCard} data={data.results} type={type} />
    </CardsSection>
  ) : null;
};

export default DiscoverSection;
