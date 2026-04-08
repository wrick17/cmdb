import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  loadPersonDetails,
  setPersonDetails,
} from "../redux/actions/personActionCreators";
import { fetchMultiple } from "../utils/utils";

export const usePersonService = () => {
  const dispatch = useDispatch();
  const person = useSelector((state) => state.person);

  const fetchPersonDetails = useCallback(
    (slug) => {
      const id = slug.split("-")[0];

      if (person.info?.id.toString() === id.toString() || person.loading) {
        return;
      }

      dispatch(loadPersonDetails());
      const apis = [
        `/api/person/${id}`,
        `/api/person/${id}/combined_credits`,
        `/api/person/${id}/images`,
      ];

      fetchMultiple(apis).then(([info, credits, images]) => {
        dispatch(
          setPersonDetails({
            info,
            credits,
            images,
          }),
        );
      });
    },
    [dispatch, person.info?.id, person.loading],
  );

  return { fetchPersonDetails };
};
