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

const Video = (props) => {
  const { ref, animator } = useAnimator(props);

  const { video } = props;

  const { key, name } = video;

  return (
    <div
      className={`video-container figo ${animator.activate ? "show" : ""}`}
      ref={ref}
    >
      <iframe
        width="355"
        height="200"
        src={`https://www.youtube.com/embed/${key}`}
        title={name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

const MediaList = ({ title, images, videos }) => {
  if (!(images?.length || videos?.length)) {
    return null;
  }

  return (
    <div title={title} className="image-list video-list">
      {videos.slice(0, 20)?.map((video, idx) => {
        return <Video video={video} key={video.key + idx} />;
      })}
      {images.slice(0, 20)?.map((image, idx) => {
        return <Image image={image} key={image.file_path + idx} />;
      })}
    </div>
  );
};

export default MediaList;
