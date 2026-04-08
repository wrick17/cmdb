import fetch from "../utils/fetch";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setConfig } from "../redux/actions/configActionCreators";

export const useConfigService = () => {
  const dispatch = useDispatch();

  const fetchConfig = useCallback(() => {
    fetch("/api/configuration")
      .then((data) => dispatch(setConfig(data)))
      .catch((err) => dispatch(setConfig({ err: err.message })));
  }, [dispatch]);

  return { fetchConfig };
};
