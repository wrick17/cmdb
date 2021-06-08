import { useSelector } from "react-redux";
import Card from "../ui/card";
import { getImageFromId } from "../utils/utils";

const SeasonCard = ({ data, onClick }) => {
  const config = useSelector((state) => state.config);

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const { id, season_number, poster_path, name } = data;

  return (
    <Card className="actor-card season" onClick={() => onClick(season_number)}>
      <img
        src={
          poster_path
            ? `${secure_base_url}${
                poster_sizes[poster_sizes.length - 2]
              }${poster_path}`
            : getImageFromId(id)
        }
        alt={name}
      />
      <div className="actor-details">
        <p className="name" title={name}>
          {name}
        </p>
      </div>
    </Card>
  );
};

export default SeasonCard;
