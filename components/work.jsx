import { memo } from "react";
import { useMovieService } from "../services/movieServices";
import { useTvService } from "../services/tvServices";
import Section from "../ui/section";
import { useNavigation } from "../utils/navigation";
import { formatYear, handleize } from "../utils/utils";

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
    <Section title="Work">
      {data.map((work) => (
        <div className="work" key={work.id}>
          <span className="year">
            {work.release_date ? formatYear(work.release_date) : "Soon"}
          </span>
          <div className="work-title">
            <span className="work-type">{work.media_type}</span>
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
          </div>
        </div>
      ))}
    </Section>
  );
});

export default Work;
