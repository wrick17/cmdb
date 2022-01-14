import { useAnimator } from "../utils/hooks";

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

const VideoList = ({ title, data }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <div title={title} className="video-list">
      {data.slice(0, 20)?.map((video, idx) => {
        return <Video video={video} key={video.file_path + idx} />;
      })}
    </div>
  );
};

export default VideoList;

// https://img.youtube.com/vi/wo2myV-7la4/0.jpg

// https://www.youtube.com/watch?v=wo2myV-7la4
