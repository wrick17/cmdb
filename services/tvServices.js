import { useDispatch, useSelector } from "react-redux";
import { setTvDetails } from '../redux/actions/tvActionCreators';
import { fetchMultiple } from "../utils/utils";

export const useTvService = () => {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv);

  const fetchTvDetails = (slug) => {
    const id = slug.split("-")[0];

    if (tv.info?.id.toString() === id || tv.loading) {
      return;
    }

    const apis = [
      `/api/tv/${id}`,
      `/api/tv/${id}/credits`,
      `/api/tv/${id}/reviews`,
    ];

    fetchMultiple(apis).then(([info, credits, reviews]) => {
      dispatch(
        setTvDetails({
          info,
          credits,
          reviews,
        })
      );
    });
  };

  const fetchSeasonEpisodes = (id, season) => {
    return fetchMultiple([`/api/tv/${id}/season/${season}`]).then(data => data?.[0]);
  }

  return { fetchTvDetails, fetchSeasonEpisodes };
};
