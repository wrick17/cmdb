import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { loadTvDetails, setTvDetails } from "../redux/actions/tvActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useTvService = () => {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv);

  const fetchTvDetails = useCallback(
    (slug) => {
      const id = slug.split("-")[0];

      if (tv.info?.id.toString() === id || tv.loading) {
        return;
      }

      dispatch(loadTvDetails());
      const apis = [
        `/api/tv/${id}`,
        `/api/tv/${id}/credits`,
        `/api/tv/${id}/reviews`,
        `/api/tv/${id}/similar`,
        `/api/tv/${id}/images`,
        `/api/tv/${id}/videos`,
        `/api/tv/${id}/watch/providers`,
      ];

      fetchMultiple(apis).then(
        ([info, credits, reviews, similar, images, videos, providers]) => {
          dispatch(
            setTvDetails({
              info,
              credits,
              reviews,
              similar,
              images,
              videos: videos.results,
              providers: providers.results,
            }),
          );
        },
      );
    },
    [dispatch, tv.info?.id, tv.loading],
  );

  const fetchSeasonEpisodes = useCallback(
    (id, season) =>
      fetchMultiple([`/api/tv/${id}/season/${season}`]).then(
        (data) => data?.[0],
      ),
    [],
  );

  return { fetchTvDetails, fetchSeasonEpisodes };
};
