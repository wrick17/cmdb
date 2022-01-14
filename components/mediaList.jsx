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
      <a href={`https://www.youtube.com/watch?v=${key}`} target='_blank' rel="noreferrer" style={{ display: 'block' }}>
        <img
          src={`https://img.youtube.com/vi/${key}/0.jpg`}
          alt={name}
          title={name}
          style={{ height: 200, width: 355, objectFit: "cover" }}
        />
        <img src="/youtube.svg" alt="Youtube" />
      </a>
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
