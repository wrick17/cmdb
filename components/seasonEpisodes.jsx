import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTvService } from "../services/tvServices";
import Frame from "../ui/frame";
import Loading from "../ui/loading";
import Text from "../ui/text";
import { formatDate } from "../utils/utils";

const SeasonEpisodes = ({ season }) => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

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

  console.log(details);

  if (loading) {
    return (
      <div className="loading-block">
        <Loading full={false} style={{ marginTop: "16px" }} />
      </div>
    );
  }

  const { name, air_date, episodes } = details || {};

  return (
    <div className="season-episodes">
      <br style={{ margin: "8px 0" }} />
      <Text className="season-name">{name}</Text>
      <Text className="block">{formatDate(air_date)}</Text>
      <div className="episodes">
        {episodes?.map((episode) => {
          return (
            <Frame key={episode.id} className="episode">
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
            </Frame>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonEpisodes;
