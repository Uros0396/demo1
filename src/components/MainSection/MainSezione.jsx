import fantasy from "../../books/fantasy.json";
import { Col, Container, Row } from "react-bootstrap";
import SingleBook from "../SingleBook/SingleBook";
import CustomCard from "../CustomCard/CustomCard";
import { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../SearchContext/SearchContext";
import { DarkContext } from "../../contexts/DarkContext";
import CommentArea from "../CommentArea/CommentArea";
import "./MainSezione.css";

const MainSezione = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { searchTerm } = useContext(SearchContext);
  const { isDarkMode } = useContext(DarkContext);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3061/blogs")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.blogs);
        setUsers(res.blogs);
      });
  }, []);

  const filteredBooks = searchTerm
    ? fantasy.filter((book) =>
        book?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const randomBook = useMemo(() => fantasy.sort(() => Math.random() - 0.5), []);

  return (
    <div className={`${isDarkMode ? "bg-dark" : "bg-light"}`}>
      <Container className="mb-4 mt-4">
        <Row className="mt-4">
          <Col lg={6} className="d-flex flex-column align-items-center mt-5">
            <h2
              className={`single-book-title title-inputs-results text-center ${
                isDarkMode ? "text-white" : "text-dark"
              }`}
            >
              Book of the Day
            </h2>

            {users.map((elem) => {
              return <p key={elem._id}>Blog: {elem?.name}</p>;
            })}

            {randomBook.slice(0, 1).map((book) => (
              <SingleBook
                key={book?.asin}
                title={book?.title}
                price={book?.price}
                img={book?.img}
                category={book?.category}
              />
            ))}
          </Col>

          <Col
            lg={6}
            className={`text-center mt-5 border ${
              isDarkMode ? "text-white" : "text-dark"
            }`}
          >
            <h3
              className={`title-inputs-results ${
                isDarkMode ? "text-dark" : ""
              }`}
            >
              Fantasy Library
            </h3>
            {searchTerm !== "" &&
              (filteredBooks.length > 0 ? (
                <ul className="list-unstyled d-flex flex-column gy-3">
                  {filteredBooks.map((book) => (
                    <li key={book?.asin}>
                      <img
                        src={book?.img}
                        alt={book?.title}
                        style={{ width: "50px", marginRight: "10px" }}
                      />
                      <div className={`${isDarkMode ? "text-dark" : ""}`}>
                        {book?.title}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Books not found</p>
              ))}
          </Col>
        </Row>
        <Row className="gy-4 mt-5">
          <Col lg={6}>
            <Row className="gy-4">
              {fantasy.slice(0, 10).map((book) => (
                <Col xs={6} md={4} lg={6} key={book?.asin}>
                  <CustomCard
                    book={book}
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col
            lg={6}
            className="right-column d-flex justify-content-center align-items-center"
          >
            {selectedBook ? (
              selectedBook.asin ? (
                <CommentArea className="side-fixed" book={selectedBook} />
              ) : (
                <h4>The selected book has no comments.</h4>
              )
            ) : (
              <h4 className={`${isDarkMode ? "text-white" : "text-dark"}`}>
                Select a book to see comments and details.
              </h4>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSezione;
