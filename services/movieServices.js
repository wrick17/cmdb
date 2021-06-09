import { useDispatch, useSelector } from "react-redux";
import { loadMovieDetails, setMovieDetails } from "../redux/actions/movieActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useMovieService = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);

  const fetchMovieDetails = (slug) => {
    dispatch(loadMovieDetails());
    const id = slug.split("-")[0];

    if (movie.info?.id.toString() === id.toString() || movie.loading) {
      return;
    }

    const apis = [
      `/api/movie/${id}`,
      `/api/movie/${id}/credits`,
      `/api/movie/${id}/reviews`,
      `/api/movie/${id}/similar`,
    ];

    fetchMultiple(apis).then(([info, credits, reviews, similar]) => {
      dispatch(
        setMovieDetails({
          info,
          credits,
          reviews,
          similar,
        })
      );
    });
  };

  return { fetchMovieDetails };
};
