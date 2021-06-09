import { useDispatch, useSelector } from "react-redux";
import { loadHome, setHome } from "../redux/actions/homeActionCreators";
import { fetchMultiple } from "../utils/utils";

export const useHomeService = () => {
  const dispatch = useDispatch();
  const home = useSelector((state) => state.home);

  const fetchDiscoverMovies = () => {
    if (home.movies) {
      return null;
    }

    const apis = [
      "/api/discover/movie",
      "/api/discover/tv",
      "/api/discover/tv?with_keywords=210024",
    ];

    dispatch(loadHome());
    fetchMultiple(apis)
      .then(([movies, tv, anime]) =>
        dispatch(
          setHome({
            movies: { label: "Disover Movies", data: movies },
            tv: { label: "Disover TV", data: tv },
            anime: { label: "Discover Anime", data: anime },
          })
        )
      )
      .catch((err) => dispatch(setHome({ err: err.message })));
  };

  return { fetchDiscoverMovies };
};
