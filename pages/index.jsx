import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHomeService } from "../services/homeServices";
import MovieCard from "../components/movieCard";
import CardsList from "../components/cardsList";
import CardsSection from "../components/cardsSection";
import Loading from "../ui/loading";

const Home = () => {
  const { fetchDiscoverMovies } = useHomeService();
  const home = useSelector((state) => state.home);
  const config = useSelector((state) => state.config);

  useEffect(() => {
    fetchDiscoverMovies();
  }, []);

  if (!config?.images) {
    return null;
  }

  return (
    <div>
      {home?.movies?.data?.results ? (
        <CardsSection title={home.movies.label}>
          <CardsList
            card={MovieCard}
            data={home.movies.data.results}
            type="movie"
          />
        </CardsSection>
      ) : (
        <div className="loading-block bordered">
          <Loading full={false} style={{ marginTop: "16px" }} />
        </div>
      )}
      {home?.tv?.data?.results ? (
        <CardsSection title={home.tv.label}>
          <CardsList card={MovieCard} data={home.tv.data.results} type="tv" />
        </CardsSection>
      ) : (
        <div className="loading-block bordered">
          <Loading full={false} style={{ marginTop: "16px" }} />
        </div>
      )}
    </div>
  );
};

export default Home;
