import { useEffect } from "react";
import { useMovieService } from "../../services/movieServices";
import Loading from "../../ui/loading";
import Text from "../../ui/text";
import Image from "../../ui/image";
import { useSelector } from "react-redux";
import { formatDate, formatYear } from "../../utils/utils";
import ReactStars from "react-stars";
import PeopleList from "../../components/peopleList";
import ReviewList from '../../components/reviewList';

const Movie = ({ params }) => {
  const { fetchMovieDetails } = useMovieService();
  const { config, movie } = useSelector((state) => state);

  console.log(movie);
  const { info, credits, reviews } = movie;

  useEffect(() => {
    fetchMovieDetails(params.id);
  }, []);

  if (!config?.images) {
    return null;
  }

  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  if (!(info && credits && reviews)) {
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
    poster_path,
    release_date,
    status,
    genres,
    runtime,
    vote_average,
    overview,
    tagline,
  } = info;

  const runTime = `${Math.floor(runtime / 60)}hrs ${runtime % 60}mins`;

  return (
    <div className="movie-page">
      <div className="movie-details">
        <Image
          src={`${secure_base_url}${
            poster_sizes[poster_sizes.length - 2]
          }${poster_path}`}
          alt={title}
        />
        <div className="right-section">
          <Text as="h1" className="movie-name block">
            {title} <span className="year">({formatYear(release_date)})</span>
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
            <span className="rating">{vote_average * 10}%</span>
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
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default Movie;
