import { useSelector } from "react-redux";
import Card from "../ui/card";
import { getImageFromId } from "../utils/utils";

const ActorCard = ({ data, sub }) => {
  const config = useSelector((state) => state.config);

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const { id, profile_path, name, ...rest } = data;

  return (
    <Card className="actor-card">
      <img
        src={
          profile_path
            ? `${secure_base_url}${
                poster_sizes[poster_sizes.length - 2]
              }${profile_path}`
            : getImageFromId(id)
        }
        alt={name}
      />
      <div className="actor-details">
        <p className="name" title={name}>
          {name}
        </p>
        {sub && <p className="character">{rest[sub]}</p>}
      </div>
    </Card>
  );
};

export default ActorCard;
