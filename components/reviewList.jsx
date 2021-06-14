import Card from "../ui/card";
import Section from "../ui/section";
import { formatDate } from "../utils/utils";
import Text from "../ui/text";

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
                    <Text as="p" className="block name">{author}</Text>
                    <Text as="p" className="block time">{formatDate(created_at)}</Text>
                    <Text as="p" className="block content">{content.slice(0, 500)}</Text>
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
