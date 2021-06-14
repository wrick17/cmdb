import { useSelector } from "react-redux";
import { usePersonService } from "../services/personServices";
import Card from "../ui/card";
import { useNavigation } from "../utils/navigation";
import { getImageFromId, handleize } from "../utils/utils";
import Text from "../ui/text";

const ActorCard = ({ data, sub }) => {
  const config = useSelector((state) => state.config);
  const navigate = useNavigation();
  const { fetchPersonDetails } = usePersonService();

  const {
    images: { secure_base_url, poster_sizes },
  } = config || {};

  const { id, profile_path, name, ...rest } = data;

  const onClickPerson = () => {
    const slug = `${id}-${handleize(name)}`;
    fetchPersonDetails(slug);
    navigate(`/person/${slug}`);
  };

  return (
    <Card className={`actor-card`} onClick={onClickPerson}>
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
        <Text className="name" title={name}>
          {name}
        </Text>
        {sub && <p className="character">{rest[sub]}</p>}
      </div>
    </Card>
  );
};

export default ActorCard;
