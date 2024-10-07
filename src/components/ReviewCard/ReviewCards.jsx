import { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DeleteReview from "../DeleteReview/DeleteReview";
import ReviewsContext from "../ReviewsContext/ReviewsContext";

export default function ReviewCards() {
  const { setComments, reviewToReload, asin } = useContext(ReviewsContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + asin,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzAxNTFmNjBmMzg1MDAwMTUxYzE3OWMiLCJpYXQiOjE3MjgxMzk3NjYsImV4cCI6MTcyOTM0OTM2Nn0.dJG3wysAo1YXU2MXgdRsxVCki2TouKvypDxix9-28d0",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [asin, reviewToReload]);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (!reviews.length) return <p>Be the first to add a review!</p>;

  return (
    <ul>
      {reviews.map((review, index) => (
        <li key={index}>
          {review.comment} - <b>{review.rate}</b> stars
          <DeleteReview id={review._id} />
        </li>
      ))}
    </ul>
  );
}
