import { useDispatch, useSelector } from "react-redux";
import {
  loadPersonDetails,
  setPersonDetails,
} from "../redux/actions/personActionCreators";
import { fetchMultiple } from "../utils/utils";

export const usePersonService = () => {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.person);

  const fetchPersonDetails = (slug) => {
    dispatch(loadPersonDetails());
    const id = slug.split("-")[0];

    if (person.info?.id.toString() === id.toString() || person.loading) {
      return;
    }

    const apis = [`/api/person/${id}`, `/api/person/${id}/combined_credits`];

    fetchMultiple(apis).then(([info, credits]) => {
      dispatch(
        setPersonDetails({
          info,
          credits,
        })
      );
    });
  };

  return { fetchPersonDetails };
};
