import Loading from "../ui/loading";
import CardsList from "./cardsList";
import CardsSection from "./cardsSection";
import MovieCard from "./movieCard";

const DiscoverSection = ({ sectionData = {}, type }) => {
  const { label, data } = sectionData;

  return label ? (
    <CardsSection title={label}>
      <CardsList card={MovieCard} data={data.results} type={type} />
    </CardsSection>
  ) : (
    <div className="loading-block bordered">
      <Loading full={false} style={{ marginTop: "16px" }} />
    </div>
  );
};

export default DiscoverSection;
