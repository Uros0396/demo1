import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fantasy from "../books/fantasy.json";

const Detail = () => {
  const { asin } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);

  const getBookDetails = () => {
    const foundBook = fantasy.find((book) => book?.asin === asin);
    if (foundBook) {
      setBook(foundBook);
    } else {
      console.error("Book not found");
    }
  };

  const getComments = async () => {
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
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookDetails();
    getComments();
  }, [asin]);

  if (loading) {
    return <p>Caricamento commenti...</p>;
  }

  return (
    <div>
      {book ? (
        <div>
          <h1>{book?.title}</h1>
          <h3>Categoria: {book?.category}</h3>
          <p>Prezzo: {book?.price}</p>
          <img src={book?.img} alt={book?.title} />
        </div>
      ) : (
        <p>Dettagli del libro non trovati.</p>
      )}
      <h1>Commenti per il libro con ASIN: {asin}</h1>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              {comment.comment} - <b>{comment.rate}</b> stelle
            </li>
          ))}
        </ul>
      ) : (
        <p>Comment Not Found.</p>
      )}
    </div>
  );
};

export default Detail;
