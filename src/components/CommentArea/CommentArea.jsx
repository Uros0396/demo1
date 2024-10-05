import React, { useContext, useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import "./CommentArea.css";
import DeleteReview from "../DeleteReview/DeleteReview";
import ReviewsContext from "../ReviewsContext/ReviewsContext";
import { PostReviewsContext } from "../PostReviewsContext/PostReviewsContext";

const CommentArea = ({ book }) => {
  const { setReviewToReload } = useContext(PostReviewsContext);
  const { reviewToReload } = useContext(ReviewsContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const [showError, setShowError] = useState(false);
  const asin = book?.asin;

  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOWQ5Y2NiMjkxYzAwMTU4ZmZhNzYiLCJpYXQiOjE3MjY5MTM5NDgsImV4cCI6MTcyODEyMzU0OH0.J_kRGzLfLnx17wdw-29AEFnyzf_BotE8397dKj8gYyk",
          },
        }
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!comment || !rate || rate < 1 || rate > 5) {
      setShowError(true);
      return;
    }

    setShowError(false);
    const commentData = {
      elementId: asin,
      comment: comment,
      rate: rate,
    };

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOWQ5Y2NiMjkxYzAwMTU4ZmZhNzYiLCJpYXQiOjE3MjY5MTM5NDgsImV4cCI6MTcyODEyMzU0OH0.J_kRGzLfLnx17wdw-29AEFnyzf_BotE8397dKj8gYyk",
          },
          body: JSON.stringify(commentData),
        }
      );

      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Errore durante l'invio");
      }
      const newReview = await response.json();
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewToReload((prev) => !prev);
      setComment("");
      setRate(1);
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  useEffect(() => {
    if (asin) {
      getData();
    }
  }, [asin, reviewToReload]);

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (!reviews.length)
    return (
      <div className="no-review-bg d-flex justify-content-center align-items-center flex-column">
        <div>
          <p>
            <strong>
              <em>Be the first to add a review!</em>
            </strong>
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column">
            <div>
              <textarea
                placeholder="Insert review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rate (1-5)"
                value={rate}
                onChange={(e) => setRate(parseInt(e.target.value))}
              />
            </div>
            {showError && (
              <p className="text-danger">
                <strong>
                  <em>Both review and rating are necessary!</em>
                </strong>
              </p>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Button className="text-center" onClick={handleAdd}>
            Add Review
          </Button>
        </div>
      </div>
    );

  return (
    <div
      className="comment-area"
      style={{
        backgroundImage: `url(${book?.img})`,
        backgroundSize: `cover`,
        backgroundPosition: `center`,
        position: "relative",
        height: "700px",
        width: "100%",
      }}
    >
      <div className="overlay">
        <div>
          <h3>Comments for {book?.title}</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                {review.comment} - <b>{review.rate}</b> stars
                <DeleteReview id={review._id} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Add a Review</h4>
          <textarea
            placeholder="Insert review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate (1-5)"
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
          />
          {showError && (
            <p className="text-danger">Both review and rating are necessary!</p>
          )}
          <Button onClick={handleAdd}>Add Review</Button>
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
