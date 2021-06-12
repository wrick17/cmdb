import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ui/button";
import Section from "../ui/section";
import SeasonCard from "./seasonCard";
import SeasonEpisodes from "./seasonEpisodes";

const Seasons = ({ data }) => {
  const [season, setSeason] = useState();
  const [showEpisodes, setShowEpisodes] = useState(false);
  const { info } = useSelector((state) => state.tv);

  if (!data?.length) return null;

  const seasonMap = {};
  info.seasons.forEach((season) => {
    seasonMap[season.season_number] = season.name;
  });

  useEffect(() => {
    if (data?.length && !season) {
      setSeason(data[0].season_number);
    }
  }, [data]);

  return (
    <Section title="Seasons">
      <div className="seasons cast-list">
        {data.map((season) => {
          return (
            <SeasonCard data={season} onClick={setSeason} key={season.id} />
          );
        })}
      </div>
      <div className="seasons-content">
        <Button
          frame="corners"
          onClick={() => setShowEpisodes(!showEpisodes)}
          text={`${
            showEpisodes ? "Hide" : `Show ${seasonMap[season]}`
          } Episodes`}
          style={{ width: "100%", marginTop: "8px" }}
        />
        {showEpisodes && <SeasonEpisodes season={season} />}
      </div>
    </Section>
  );
};

export default Seasons;
