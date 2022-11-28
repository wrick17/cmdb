import Head from "next/head";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import Layout from "../utils/layout";
import Header from '../components/header';
import Footer from '../components/footer';

import "../styles/globals.css";
import "../styles/ui.css";
import "../styles/home.css";
import "../styles/movie.css";
import "../styles/search.css";


function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </Provider>
  );
}

export default MyApp;
