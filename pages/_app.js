import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "../styles/globals.css";
import Utils from '../utils/utils';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Utils>
        <Component {...pageProps} />
      </Utils>
    </Provider>
  );
}

export default MyApp;
