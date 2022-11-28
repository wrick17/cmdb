import { memo } from "react";
import { useSelector } from "react-redux";
import Card from "../ui/card";
import Text from "../ui/text";
import { formatDate, handleize } from "../utils/utils";
import { useNavigation } from "../utils/navigation";
import { useMovieService } from "../services/movieServices";
import { useTvService } from "../services/tvServices";
import { useAnimator } from "../utils/hooks";
import Link from "next/link";
import { Rating } from './rating';

const MovieCard = memo((props) => {
  const config = useSelector((state) => state.config);
  const navigate = useNavigation();
  const { fetchMovieDetails } = useMovieService();
  const { fetchTvDetails } = useTvService();
  const {
    ref,
    animator: { activate },
  } = useAnimator(props);

  const { data, type, ...rest } = props;
  const {
    id,
    name,
    title,
    poster_path,
    vote_average = 0,
    release_date,
    first_air_date,
    media_type,
  } = data;

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};
  const slug = `${id}-${handleize(title || name)}`;
  let mediaType = type;

  const onClickMovie = () => {
    if (!type) {
      mediaType = media_type;
    }
    if (mediaType === "movie") {
      fetchMovieDetails(slug);
      navigate(`/movie/${slug}`);
    } else {
      fetchTvDetails(slug);
      navigate(`/tv/${slug}`);
    }
  };

  return (
    <Card
      className={`movie-card`}
      onClick={onClickMovie}
      href={`/${mediaType}/${slug}`}
      {...rest}
    >
      <img
        src={
          poster_path
            ? `${secure_base_url}${
                poster_sizes[poster_sizes.length - 2]
              }${poster_path}`
            : "/placeholders/placeholder.png"
        }
        alt={title}
        className={`figo ${activate ? "show" : ""}`}
        ref={ref}
        loading="lazy"
      />
      <div className="movie-card-details">
        <Text className="movie-name" title={title || name}>
          {title || name}
        </Text>
        <div className={`rating-container figo ${activate ? "show" : ""}`}>
          <Rating value={vote_average * 10} />
          <Text className="rating">
            {vote_average ? `${parseInt(vote_average * 10)}%` : "NA"}
          </Text>
        </div>
        <Text className="release-date">
          {release_date || first_air_date
            ? formatDate(release_date || first_air_date)
            : "No Date"}
        </Text>
      </div>
    </Card>
  );
});

export default MovieCard;







