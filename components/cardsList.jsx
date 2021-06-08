import { memo, useState } from "react";
import Button from "../ui/button";
import MovieCard from "./movieCard";

const CardsList = memo(({ data = [], ...props }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="movies">
      {data?.length
        ? (showAll ? data : data.slice(0, 5)).map((movie) => (
            <MovieCard data={movie} key={movie.id} {...props} />
          ))
        : null}
      <Button
        frame="pentagon"
        containerStyles={{
          display: "flex",
          alignItems: "center",
          paddingRight: "16px",
        }}
        style={{ fontSize: "12px" }}
        text={showAll ? "Show Less" : "View More"}
        onClick={() => setShowAll(!showAll)}
      />
    </div>
  );
});

export default CardsList;
