import Head from 'next/head'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHomeService } from "../services/homeServices";
import DiscoverSection from "../components/discoverSection";
import Loading from "../ui/loading";
import HomeTopic from "../components/homeTopic";
import Search from './search';

const Home = () => {
  const { fetchDiscoverMovies } = useHomeService();
  const home = useSelector((state) => state.home);
  const config = useSelector((state) => state.config);

  useEffect(() => {
    fetchDiscoverMovies();
  }, []);

  if (!(config?.images && home?.movies)) {
    return (
      <Loading>
        <h1>Hang on while we find things for you to watch</h1>
      </Loading>
    );
  }

  return (
    <>
      <Head>
        <title>CMDb | Home</title>
      </Head>
      <HomeTopic />
      <Search />
      <DiscoverSection sectionData={home?.movies} type="movie" />
      <DiscoverSection sectionData={home?.tv} type="tv" />
      <DiscoverSection sectionData={home?.anime} type="tv" />
    </>
  );
};

export default Home;
