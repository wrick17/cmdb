import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import { useEpisodeService } from "../../../../../../services/episodeServices";
import Loading from "../../../../../../ui/loading";
import Image from "../../../../../../ui/image";
import Text from "../../../../../../ui/text";
import { useAnimator } from "../../../../../../utils/hooks";
import { formatDate } from "../../../../../../utils/utils";
import PeopleList from "../../../../../../components/peopleList";
import { useTvService } from "../../../../../../services/tvServices";
import ImageList from "../../../../../../components/imageList";

const Episode = (props) => {
  const router = useRouter();
  const {
    config,
    episode,
    tv,
    route: { routing },
  } = useSelector((state) => state);
  const {
    ref,
    animator: { activate },
  } = useAnimator(props);

  const { fetchEpisodeDetails } = useEpisodeService();
  const { fetchTvDetails } = useTvService();

  const { params } = props;
  const { id, episodeId, seasonId } = router.query || params;
  const { loading, info, images: episodeImages } = episode;

  useEffect(() => {
    fetchTvDetails(id);
    fetchEpisodeDetails(id, seasonId, episodeId);
  }, [id, seasonId, episodeId]);

  if (!(config?.images && info && episodeImages) || (loading && !routing)) {
    return <Loading />;
  }

  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  const {
    still_path,
    name,
    air_date,
    vote_average,
    overview,
    crew,
    guest_stars,
  } = info;

  return (
    <div className="movie-page episode-page">
      <div className="movie-details" ref={ref}>
        <Image
          src={
            still_path
              ? `${secure_base_url}${
                  poster_sizes[poster_sizes.length - 2]
                }${still_path}`
              : "/placeholders/placeholder.png"
          }
          alt={name}
          className={`figo ${activate ? "show" : ""}`}
        />
        <div className="right-section">
          <Text as="h1" className="movie-name block">
            {name}
          </Text>
          <div>
            <Text>{formatDate(air_date)}</Text>
          </div>
          <div className="rating-container">
            <ReactStars
              count={5}
              value={vote_average / 2}
              size={14}
              color2={"#00f8f8"}
              className="stars"
              char="⬤"
            />
            <span className="rating">{vote_average * 10}%</span>
          </div>
          <Text as="h6" className="sub-heading block">
            Overview
          </Text>
          <Text className="overview block" as="p">
            {overview}
          </Text>
        </div>
      </div>
      <ImageList data={episodeImages.stills} title="Frames from the Episode" />
      <PeopleList title="Cast" list={tv.credits.cast} sub="character" />
      <PeopleList title="Guest Stars" list={guest_stars} sub="character" />
      <PeopleList title="Crew" list={crew} sub="job" />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default Episode;
