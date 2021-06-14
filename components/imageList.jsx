import { useSelector } from "react-redux";
import Section from "../ui/section";
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
  if (data?.length < 2) {
    return null;
  }
  const [, ...rest] = data;

  return (
    <Section title={title} className="image-list">
      {rest?.map((image, idx) => {
        return <Image image={image} key={image.file_path + idx} />;
      })}
    </Section>
  );
};

export default ImageList;
