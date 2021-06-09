import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHomeService } from "../services/homeServices";
import DiscoverSection from '../components/discoverSection';

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
      <DiscoverSection sectionData={home?.movies} type="movie" />
      <DiscoverSection sectionData={home?.tv} type="tv" />
      <DiscoverSection sectionData={home?.anime} type="tv" />
    </div>
  );
};

export default Home;
