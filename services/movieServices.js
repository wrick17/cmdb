import { useDispatch, useSelector } from "react-redux";
import {
  loadMovieDetails,
  setMovieDetails,
} from "../redux/actions/movieActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useMovieService = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);

  const fetchMovieDetails = (slug) => {
    const id = slug.split("-")[0];

    if (movie.info?.id.toString() === id.toString() || movie.loading) {
      return;
    }

    dispatch(loadMovieDetails());
    const apis = [
      `/api/movie/${id}`,
      `/api/movie/${id}/credits`,
      `/api/movie/${id}/reviews`,
      `/api/movie/${id}/similar`,
      `/api/movie/${id}/images`,
      `/api/movie/${id}/videos`,
      `/api/movie/${id}/watch/providers`,
    ];

    fetchMultiple(apis).then(
      ([info, credits, reviews, similar, images, videos, providers]) => {
        dispatch(
          setMovieDetails({
            info,
            credits,
            reviews,
            similar,
            images,
            videos: videos.results,
            providers: providers.results,
          })
        );
      }
    );
  };

  return { fetchMovieDetails };
};
