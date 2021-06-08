import axios from 'axios';
import { useDispatch } from "react-redux";
import { setConfig } from "../redux/actions/configActionCreators";

export const useConfigService = () => {
  const dispatch = useDispatch();

  const fetchConfig = () => {
    axios
      .get("/api/configuration")
      .then((res) => dispatch(setConfig(res.data)))
      .catch((err) => dispatch(setConfig({ err: err.message })));
  };

  return { fetchConfig };
};
