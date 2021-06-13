import { memo } from "react";
import { useMovieService } from "../services/movieServices";
import { useTvService } from "../services/tvServices";
import Section from "../ui/section";
import { useNavigation } from "../utils/navigation";
import { formatYear, handleize } from "../utils/utils";
import Text from "../ui/text";

const Work = memo(({ data }) => {
  const { fetchMovieDetails } = useMovieService();
  const { fetchTvDetails } = useTvService();
  const navigate = useNavigation();

  if (!data?.length) {
    return null;
  }

  const onClickLink = (e, work) => {
    e.preventDefault();
    const mediaType = work.media_type;
    const slug = `${work.id}-${handleize(work.title || work.name)}`;

    if (mediaType === "movie") {
      fetchMovieDetails(slug);
      navigate(`/movie/${slug}`);
    } else {
      fetchTvDetails(slug);
      navigate(`/tv/${slug}`);
    }
  };

  return (
    <Section title="Work" contentClassName="work-section">
      <div className="work-list">
        {data.map((work) => (
          <div className="work" key={work.id}>
            <span className="year">
              {work.release_date || work.first_air_date
                ? formatYear(work.release_date || work.first_air_date)
                : "Soon"}
            </span>
            <span className="work-type">{work.media_type}</span>
            <Text as="div" className="work-title">
              <a
                href={`/${work.media_type}/${work.id}-${handleize(
                  work.title || work.name
                )}`}
                onClick={(e) => onClickLink(e, work)}
                className="work-name"
              >
                {work.title || work.name}
              </a>
              {work.character || work.job ? (
                <>
                  <span className="as"> as </span>
                  <span>{work.character || work.job}</span>
                </>
              ) : null}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
});

export default Work;
