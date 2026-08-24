import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "../components/header";
import Footer from "../components/footer";
import Home from "../pages";
import Movie from "../pages/movie/[id]";
import Person from "../pages/person/[id]";
import Search from "../pages/search";
import Tv from "../pages/tv/[id]";
import Episode from "../pages/tv/[id]/season/[seasonId]/episode/[episodeId]";
import { useStore } from "../redux/store";
import Layout from "../utils/layout";

import "../styles/globals.css";
import "../styles/ui.css";
import "../styles/home.css";
import "../styles/movie.css";
import "../styles/search.css";

const App = () => {
  const store = useStore();

  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<Tv />} />
          <Route path="/person/:id" element={<Person />} />
          <Route
            path="/tv/:id/season/:seasonId/episode/:episodeId"
            element={<Episode />}
          />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
        <Footer />
      </Layout>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
