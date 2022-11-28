import fetch from "../utils/fetch";
import { useDispatch } from "react-redux";
import { setConfig } from "../redux/actions/configActionCreators";

export const useConfigService = () => {
  const dispatch = useDispatch();

  const fetchConfig = () => {
    fetch("/api/configuration")
      .then((data) => dispatch(setConfig(data)))
      .catch((err) => dispatch(setConfig({ err: err.message })));
  };

  return { fetchConfig };
};

