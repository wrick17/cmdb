import Text from "../ui/text";

const HomeTopic = () => {
  return (
    <div className="home-topic">
      <Text as="h4" style={{ textTransform: "initial" }}>
        The Cyber Movie Database is built using Arwes with TMDb as the data
        source
      </Text>
      <div className="images">
        <a target="_blank" rel="noreferrer" href="https://arwes.dev">
          <img src="/arwes.png" alt="Arwes.dev" />
        </a>
        <span>+</span>
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
          <img src="/tmdb.svg" alt="TMDb" />
        </a>
      </div>
    </div>
  );
};

export default HomeTopic;
