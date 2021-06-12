import Card from "../ui/card";
import Section from "../ui/section";
import { formatDate } from "../utils/utils";

const ReviewList = ({ reviews }) => {
  if (!reviews?.results?.length) {
    return null;
  }

  return (
    <div className="cast reviews">
      <Section title="Reviews">
        <div className="reviews-list">
          {reviews?.results
            ? reviews?.results?.slice(0, 5)?.map((review) => {
                const { id, content, author, created_at } = review;
                return (
                  <Card key={id} className="review">
                    <p className="name">{author}</p>
                    <p className="time">{formatDate(created_at)}</p>
                    <p className="content">{content.slice(0, 500)}</p>
                  </Card>
                );
              })
            : null}
        </div>
      </Section>
    </div>
  );
};

export default ReviewList;
