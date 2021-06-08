import { memo } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import Card from "../ui/card";
import Text from "../ui/text";
import { formatDate, handleize } from "../utils/utils";
import { useNavigation } from "../utils/navigation";
import { useMovieService } from "../services/movieServices";
import { useTvService } from "../services/tvServices";
import { useAnimator } from "../utils/hooks";

const MovieCard = memo((props) => {
  const config = useSelector((state) => state.config);
  const navigate = useNavigation();
  const { fetchMovieDetails } = useMovieService();
  const { fetchTvDetails } = useTvService();
  const { ref, animator: { activate } } = useAnimator(props);

  const { data, type, ...rest } = props;
  const { id, name, title, poster_path, vote_average, release_date } = data;

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const onClickMovie = () => {
    const slug = `${id}-${handleize(title || name)}`;
    if (type === "tv") {
      fetchTvDetails(slug);
      navigate(`/tv/${slug}`);
    } else {
      fetchMovieDetails(slug);
      navigate(`/movie/${slug}`);
    }
  };

  return (
    <Card className="movie-card" onClick={onClickMovie} {...rest}>
      <img
        src={`${secure_base_url}${
          poster_sizes[poster_sizes.length - 2]
        }${poster_path}`}
        alt={title}
        className={`figo ${activate ? "show" : ""}`}
        ref={ref}
      />
      <div className="movie-details">
        <Text className="movie-name" title={title || name}>
          {title || name}
        </Text>
        <div className={`rating-container figo ${activate ? "show" : ""}`}>
          <ReactStars
            count={5}
            value={vote_average / 2}
            size={8}
            color2={"#00f8f8"}
            className="stars"
            char="⬤"
          />
          <Text className="rating">{vote_average * 10}%</Text>
        </div>
        <Text className="release-date">{formatDate(release_date)}</Text>
      </div>
    </Card>
  );
});

export default MovieCard;