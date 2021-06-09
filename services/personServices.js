import { useDispatch, useSelector } from "react-redux";
import { setPersonDetails } from "../redux/actions/personActionCreators";
import { fetchMultiple } from "../utils/utils";

export const usePersonService = () => {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.person);

  const fetchPersonDetails = (slug) => {
    const id = slug.split("-")[0];

    if (person.info?.id.toString() === id.toString() || person.loading) {
      return;
    }

    const apis = [
      `/api/person/${id}`,
      `/api/person/${id}/combined_credits`,
      // `/api/person/${id}/reviews`,
      // `/api/person/${id}/similar`,
    ];

    fetchMultiple(apis).then(
      ([
        info,
        credits, 
        // reviews, 
        // similar
      ]) => {
        dispatch(
          setPersonDetails({
            info,
            credits,
            // reviews,
            // similar,
          })
        );
      }
    );
  };

  return { fetchPersonDetails };
};
