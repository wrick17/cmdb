import { memo } from "react";
import { useLazyListData } from "../utils/lazyLoadList";
import MovieCard from "./movieCard";

const CardsList = memo(({ data = [], ...props }) => {
  const { list, onScroll } = useLazyListData(data);

  return (
    <div className="movies" onScroll={onScroll}>
      {list?.length
        ? list.map((movie) => (
            <MovieCard data={movie} key={movie.id} {...props} />
          ))
        : null}
    </div>
  );
});

export default CardsList;
