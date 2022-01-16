import Head from "next/head";
import { useEffect } from "react";
import Loading from "../../ui/loading";
import Text from "../../ui/text";
import { useSelector } from "react-redux";
import { formatDate, formatYear } from "../../utils/utils";
import ReactStars from "react-stars";
import PeopleList from "../../components/peopleList";
import ReviewList from "../../components/reviewList";
import { useTvService } from "../../services/tvServices";
import Seasons from "../../components/seasons";
import Section from "../../ui/section";
import MovieCard from "../../components/movieCard";
import CardsList from "../../components/cardsList";
import { useRouter } from "next/router";
import MediaList from "../../components/mediaList";

const Tv = (props) => {
  const router = useRouter();
  const { fetchTvDetails } = useTvService();
  const {
    config,
    tv,
    route: { routing },
  } = useSelector((state) => state);

  const { params } = props;
  const {
    info,
    credits,
    reviews,
    similar,
    loading,
    images: tvImages,
    videos,
    providers,
  } = tv;

  useEffect(() => {
    fetchTvDetails(router.query.id || params.id);
  }, [router.query.id, params.id]);

  if (
    !(config?.images && info && credits && reviews) ||
    (loading && !routing)
  ) {
    return <Loading />;
  }

  const {
    name,
    title,
    release_date,
    status,
    genres,
    vote_average,
    overview,
    tagline,
    seasons,
    last_air_date,
    next_episode_to_air,
    vote_count,
  } = info;

  return (
    <div className="movie-page">
      <Head>
        <title>
          {title || name} ({formatYear(release_date)})
        </title>
      </Head>
      <MediaList images={tvImages.backdrops} videos={videos} />
      <div className="movie-details">
        <div className="right-section">
          <Text as="h1" className="movie-name block">
            {title || name}{" "}
            {release_date && (
              <span className="year">[{formatYear(release_date)}]</span>
            )}
          </Text>
          <div className="movie-date">
            <div className="detail-block">
              <Text className="status">{status}</Text>
              <Text>{seasons.length} Seasons</Text>
              <Text style={{ whiteSpace: "normal" }}>
                {genres.map((g) => g.name).join(", ")}
              </Text>
            </div>
            <div className="detail-block">
              <Text>Last Air Date: {formatDate(last_air_date)}</Text>
              {next_episode_to_air && (
                <Text>
                  Next Air Date: {formatDate(next_episode_to_air?.air_date)}
                </Text>
              )}
            </div>
          </div>
          <div className="rating-container">
            <ReactStars
              count={5}
              value={vote_average / 2}
              size={14}
              color2={"#00f8f8"}
              className="stars"
              char="⬤"
            />
            <span className="rating">
              {vote_average * 10}% [ {vote_count} ]
            </span>
          </div>
          <Text className="tagline block" as="p">
            {tagline}
          </Text>
          <Text as="h6" className="sub-heading block">
            Overview
          </Text>
          <Text className="overview block" as="p">
            {overview}
          </Text>
          {providers?.IN?.flatrate?.length && (
            <Text as="h6" className="sub-heading block">
              Streaming on -{" "}
              {providers?.IN?.flatrate?.map(
                ({ provider_name, provider_id }) => (
                  <span key={provider_id} className="streaming-on">
                    {provider_name}
                  </span>
                )
              )}
            </Text>
          )}
        </div>
      </div>
      <PeopleList title="Cast" list={credits.cast} sub="character" />
      <PeopleList title="Crew" list={credits.crew} sub="job" />
      <Seasons data={seasons} />
      <ReviewList reviews={reviews} />
      {similar?.results?.length ? (
        <Section title="Similar TV Shows">
          <CardsList card={MovieCard} data={similar.results} type="tv" />
        </Section>
      ) : null}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default Tv;
