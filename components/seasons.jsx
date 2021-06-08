import { useEffect, useState } from "react";
import Section from '../ui/section';
import SeasonCard from "./seasonCard";
import SeasonEpisodes from "./seasonEpisodes";

const Seasons = ({ data }) => {
  const [season, setSeason] = useState();

  if (!data?.length) return null;

  useEffect(() => {
    if (data?.length && !season) {
      setSeason(data[0].season_number);
    }
  }, [data]);

  const onClickSeason = (id) => setSeason(season === id ? undefined : id);

  return (
    <Section title="Seasons">
      <div className="seasons cast-list">
        {data.map((season) => {
          return (
            <SeasonCard data={season} onClick={onClickSeason} key={season.id} />
          );
        })}
      </div>
      <SeasonEpisodes season={season} />
    </Section>
  );
};

export default Seasons;
