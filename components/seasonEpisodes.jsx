import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTvService } from "../services/tvServices";
import Loading from "../ui/loading";
import Text from "../ui/text";
import { useAnimator } from "../utils/hooks";
import { formatDate } from "../utils/utils";

const Episode = (props) => {
  const config = useSelector((state) => state.config);

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const {
    ref,
    animator: { activate },
  } = useAnimator(props);
  const { episode } = props;

  console.log(episode);

  return (
    <div ref={ref} className={`episode  border ${activate ? "show" : ""}`}>
      <img
        src={
          episode.still_path
            ? `${secure_base_url}${poster_sizes[poster_sizes.length - 2]}${
                episode.still_path
              }`
            : "/placeholders/placeholder.png"
        }
        alt={episode.name}
        className={`figo ${activate ? "show" : ""}`}
        ref={ref}
      />
      <div className="episode-details">
        <Text className="episode-name block">
          {episode.episode_number}. {episode.name}
        </Text>
        <Text
          className="block"
          style={{ margin: "4px 0 8px", fontSize: "12px" }}
        >
          {formatDate(episode.air_date)}
        </Text>
        {episode.overview && <Text>{episode.overview}</Text>}
      </div>
    </div>
  );
};

const SeasonEpisodes = (props) => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

  const { season } = props;

  const { info } = useSelector((state) => state.tv);
  const { fetchSeasonEpisodes } = useTvService();

  useEffect(() => {
    if (season || season === 0) {
      setLoading(true);
      fetchSeasonEpisodes(info.id, season)
        .then(setDetails)
        .finally(() => setLoading(false));
    }
  }, [season]);

  if (!season && season !== 0) {
    return null;
  }

  if (loading) {
    return <Loading />;
  }

  const { name, air_date, episodes } = details || {};

  return (
    <div className="season-episodes">
      <br style={{ margin: "8px 0" }} />
      <Text className="season-name">{name}</Text>
      <Text className="block">{formatDate(air_date)}</Text>
      <div className="episodes">
        {episodes?.map((episode) => (
          <Episode episode={episode} key={episode.id} />
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodes;
