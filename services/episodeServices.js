import { useDispatch, useSelector } from "react-redux";
import {
  loadEpisodeDetails,
  setEpisodeDetails,
} from "../redux/actions/episodeActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useEpisodeService = () => {
  const dispatch = useDispatch();
  const episode = useSelector((state) => state.episode);

  const fetchEpisodeDetails = (slug, season, epi) => {
    const id = slug.split("-")[0];

    if (episode.info?.id.toString() === id.toString() || episode.loading) {
      return;
    }

    dispatch(loadEpisodeDetails());
    const apis = [
      `/api/tv/${id}/season/${season}/episode/${epi}`,
      `/api/tv/${id}/season/${season}/episode/${epi}/images`,
    ];

    fetchMultiple(apis).then(([info, images]) => {
      dispatch(
        setEpisodeDetails({
          info,
          images,
        })
      );
    });
  };

  return { fetchEpisodeDetails };
};
