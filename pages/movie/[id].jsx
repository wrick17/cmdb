import { useEffect } from "react";
import { useMovieService } from "../../services/movieServices";
import Loading from "../../ui/loading";
import Text from "../../ui/text";
import { useSelector } from "react-redux";
import { formatDate, formatYear } from "../../utils/utils";
import ReactStars from "react-stars";
import PeopleList from "../../components/peopleList";
import ReviewList from "../../components/reviewList";
import CardsList from "../../components/cardsList";
import Section from "../../ui/section";
import { useRouter } from "next/router";
import MediaList from "../../components/mediaList";
import Meta from '../../components/meta';

const Movie = ({ params }) => {
  const router = useRouter();
  const { fetchMovieDetails } = useMovieService();
  const {
    config,
    movie,
    route: { routing },
  } = useSelector((state) => state);

  const {
    info,
    credits,
    reviews,
    similar,
    loading,
    images: movieImages,
    videos,
    providers,
  } = movie;

  useEffect(() => {
    fetchMovieDetails(router.query.id || params.id);
  }, [router.query.id, params.id]);

  if (
    !(config?.images && info && credits && reviews && movieImages) ||
    (loading && !routing)
  ) {
    return <Loading />;
  }

  const creditsMap = {};
  credits.crew.forEach(({ name, known_for_department }) => {
    creditsMap[known_for_department] = name;
  });
  const importantPeople = ["Directing", "Production"];
  const crew = importantPeople.map((position) => ({
    label: position,
    name: creditsMap[position],
  }));

  const {
    title,
    release_date,
    status,
    genres,
    runtime,
    vote_average,
    vote_count,
    overview,
    tagline,
    poster_path,
  } = info;

  const runTime = `${Math.floor(runtime / 60)}hrs ${runtime % 60}mins`;

  return (
    <div className="movie-page">
      <Meta
        name={`${title} (${formatYear(release_date)})`}
        description={overview}
        image={poster_path}
      />
      <MediaList images={movieImages.backdrops} videos={videos} />
      <div className="movie-details">
        <div className="right-section">
          <Text as="h1" className="movie-name block">
            {title}{" "}
            {release_date && (
              <span className="year">[{formatYear(release_date)}]</span>
            )}
          </Text>
          <div className="movie-date">
            <div className="detail-block">
              <Text className="status">{status}</Text>
              <Text>{formatDate(release_date)}</Text>
            </div>
            <div className="detail-block">
              <Text>{genres.map((g) => g.name).join(", ")}</Text>
              <Text>{runTime}</Text>
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
          <Text as="h6" className="sub-heading block">
            Crew
          </Text>
          <div className="crew">
            {crew.map(({ label, name }) => (
              <div className="crew-member" key={label}>
                <p>{name}</p>
                <label>{label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PeopleList title="Cast" list={credits.cast} sub="character" />
      <PeopleList title="Crew" list={credits.crew} sub="job" />
      <ReviewList reviews={reviews} />
      {similar?.results?.length ? (
        <Section title="Similar Movies">
          <CardsList data={similar.results} type="movie" />
        </Section>
      ) : null}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default Movie;
