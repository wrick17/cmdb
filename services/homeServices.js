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

    const apis = ["/api/discover/movie", "/api/discover/tv"];

    dispatch(loadHome());
    fetchMultiple(apis)
      .then(([movies, tv]) =>
        dispatch(
          setHome({
            movies: { label: "Disover Movies", data: movies },
            tv: { label: "Disover TV", data: tv },
          })
        )
      )
      .catch((err) => dispatch(setHome({ err: err.message })));
  };

  return { fetchDiscoverMovies };
};
