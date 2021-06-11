import { useSelector } from "react-redux";
import { useMovieService } from "../services/movieServices";
import { useTvService } from "../services/tvServices";
import { usePersonService } from "../services/personServices";
import Frame from "../ui/frame";
import { useAnimator } from "../utils/hooks";
import { useNavigation } from "../utils/navigation";
import { formatDate, handleize } from "../utils/utils";

const SearchCard = (props) => {
  const { data } = props;
  const config = useSelector((state) => state.config);
  const {
    ref,
    animator: { activate },
  } = useAnimator(props);
  const navigate = useNavigation();
  const { fetchMovieDetails } = useMovieService();
  const { fetchTvDetails } = useTvService();
  const { fetchPersonDetails } = usePersonService();

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const {
    id,
    title,
    name,
    poster_path,
    profile_path,
    release_date,
    media_type,
    vote_average,
    vote_count,
    known_for_department,
  } = data;

  const onClickMovie = () => {
    const slug = `${id}-${handleize(title || name)}`;
    let mediaType = media_type;

    if (mediaType === "movie") {
      fetchMovieDetails(slug);
      navigate(`/movie/${slug}`);
    } else if (mediaType === "tv") {
      fetchTvDetails(slug);
      navigate(`/tv/${slug}`);
    } else {
      fetchPersonDetails(slug);
      navigate(`/person/${slug}`);
    }
  };

  const isPerson = media_type === "person";

  const imageUrl = isPerson ? profile_path : poster_path;

  return (
    <Frame className="search-card">
      <div className="search-content" onClick={onClickMovie}>
        <img
          src={
            imageUrl
              ? `${secure_base_url}${
                  poster_sizes[poster_sizes.length - 2]
                }${imageUrl}`
              : "/placeholders/placeholder.png"
          }
          alt={title}
          className={`figo ${activate ? "show" : ""}`}
          ref={ref}
        />
        <div className={`right-section figo ${activate ? "show" : ""}`}>
          <h6 as="h6" className="block">
            {title || name}
          </h6>
          <span containerStyles={{ fontSize: 0 }} className="item-type">
            {isPerson ? known_for_department : media_type}
          </span>
          <div className="rating-container">
            {!isPerson && <span>{formatDate(release_date)}</span>}
            {!isPerson && (
              <span className="rating">
                Rating :{" "}
                {vote_average ? `${vote_average * 10}% [${vote_count}]` : "NA"}
              </span>
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default SearchCard;
