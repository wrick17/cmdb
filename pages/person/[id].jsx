import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CardsList from "../../components/cardsList";
import Work from "../../components/work";
import { usePersonService } from "../../services/personServices";
import Image from "../../ui/image";
import Loading from "../../ui/loading";
import Section from "../../ui/section";
import Text from "../../ui/text";
import { useAnimator } from "../../utils/hooks";
import { formatDate, getAge, sortTitles } from "../../utils/utils";
import ImageList from "../../components/imageList";
import Meta from '../../components/meta';

const Person = (props) => {
  const router = useRouter();
  const { fetchPersonDetails } = usePersonService();
  const {
    ref,
    animator: { activate },
  } = useAnimator(props);
  const {
    config,
    person,
    route: { routing },
  } = useSelector((state) => state);

  const { params } = props;
  const { info, credits, loading, images: personImages } = person;

  useEffect(() => {
    fetchPersonDetails(router.query.id || params.id);
  }, [router.query.id, params.id]);

  if (!(config?.images && person.info) || (loading && !routing)) {
    return <Loading />;
  }

  const { images } = config || {};
  const { secure_base_url, poster_sizes } = images || {};

  const { name, profile_path, biography, known_for_department, birthday } =
    info;

  return (
    <div className="movie-page">
      <Meta name={name} description={biography} image={profile_path} />
      <div className="movie-details" re={ref}>
        <Image
          src={
            profile_path
              ? `${secure_base_url}${
                  poster_sizes[poster_sizes.length - 2]
                }${profile_path}`
              : "/placeholders/placeholder.png"
          }
          alt={name}
          className={`figo ${activate ? "show" : ""}`}
        />
        <div className="right-section">
          <Text as="h1" className="movie-name block">
            {name}
          </Text>
          <Text className="block space-below">{biography}</Text>
          <div className="details-block">
            <Text className="status space-right">{known_for_department}</Text>
            <Text>
              {getAge(birthday)} Years [ Born {formatDate(birthday)} ]
            </Text>
          </div>
        </div>
      </div>
      <Section title="Movies and Shows">
        <CardsList data={credits.cast} />
      </Section>
      <Section title="Images">
        <div className="person-image-container">
          <ImageList data={personImages.profiles} />
        </div>
      </Section>
      <Work data={sortTitles([...credits?.cast, ...credits?.crew])} />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  return { props: { params } };
};

export default Person;
