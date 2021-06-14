import { useSelector } from "react-redux";
import { useAnimator } from "../utils/hooks";

const Image = (props) => {
  const { config } = useSelector((state) => state);
  const { ref, animator } = useAnimator(props);

  const { image } = props;

  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  return (
    <div
      className={`image-container figo ${animator.activate ? "show" : ""}`}
      ref={ref}
    >
      <img
        src={
          image.file_path
            ? `${secure_base_url}${poster_sizes[poster_sizes.length - 2]}${
                image.file_path
              }`
            : "/placeholders/placeholder.png"
        }
      />
    </div>
  );
};

const ImageList = ({ title, data }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <div title={title} className="image-list">
      {data.slice(0, 20)?.map((image, idx) => {
        return <Image image={image} key={image.file_path + idx} />;
      })}
    </div>
  );
};

export default ImageList;
