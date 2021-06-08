import { useDispatch, useSelector } from "react-redux";
import { setMovieDetails } from "../redux/actions/movieActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useMovieService = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);

  const fetchMovieDetails = (slug) => {
    const id = slug.split("-")[0];

    if (movie.info?.id.toString() === id || movie.loading) {
      return;
    }

    const apis = [
      `/api/movie/${id}`,
      `/api/movie/${id}/credits`,
      `/api/movie/${id}/reviews`,
    ];

    fetchMultiple(apis).then(([info, credits, reviews]) => {
      dispatch(
        setMovieDetails({
          info,
          credits,
          reviews,
        })
      );
    });
  };

  return { fetchMovieDetails };
};
