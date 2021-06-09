import Text from "../ui/text";

const HomeTopic = () => {
  return (
    <div className="home-topic">
      <Text as="h6">
        This portal is built using{" "}
        <a target="_blank" rel="noreferrer" href="https://arwes.dev">
          Arwes
        </a>{" "}
        pulling data from{" "}
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
          TMDb
        </a>
      </Text>
      <div className="images">
        <a target="_blank" rel="noreferrer" href="https://arwes.dev">
          <img src="https://arwes.dev/logo-vertical.png" alt="Arwes.dev" />
        </a>
        <span>+</span>
        <a target="_blank" rel="noreferrer" href="https://www.themoviedb.org/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt="TMDb"
          />
        </a>
      </div>
    </div>
  );
};

export default HomeTopic;