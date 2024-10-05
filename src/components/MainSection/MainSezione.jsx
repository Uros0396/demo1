import fantasy from "../../books/fantasy.json";
import { Col, Container, Row } from "react-bootstrap";
import SingleBook from "../SingleBook/SingleBook";
import CustomCard from "../CustomCard/CustomCard";
import { useContext, useMemo, useState } from "react";
import { SearchContext } from "../SearchContext/SearchContext";
import { DarkContext } from "../../contexts/DarkContext";
import CommentArea from "../CommentArea/CommentArea";
import "./MainSezione.css";

const MainSezione = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const { searchTerm } = useContext(SearchContext);
  const { isDarkMode } = useContext(DarkContext);

  const filteredBooks = searchTerm
    ? fantasy.filter((book) =>
        book?.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const randomBook = useMemo(() => fantasy.sort(() => Math.random() - 0.5), []);

  return (
    <div className={`${isDarkMode ? "bg-dark" : "bg-light"}`}>
      <div className="mt-4 d-flex justify-content-center align-items-center">
        <h2 className="text-center">Book of the Day</h2>
      </div>
      <div>
        {randomBook.slice(0, 1).map((book) => (
          <SingleBook
            key={book?.asin}
            title={book?.title}
            price={book?.price}
            img={book?.img}
            category={book?.category}
          />
        ))}
      </div>

      <Container className="mb-0 mt-4" style={{ flex: 7 }}>
        <Row className="mt-5">
          <h3 className="text-center">Your Books</h3>
          {searchTerm !== "" &&
            (filteredBooks.length > 0 ? (
              <ul>
                {filteredBooks.map((book) => (
                  <li key={book?.asin}>{book?.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Books not found</p>
            ))}
        </Row>

        <Row className="gy-4 mt-5">
          <Col lg={6}>
            <Row className="gy-4">
              {fantasy.slice(0, 10).map((book) => (
                <Col lg={6} key={book?.asin}>
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
                <CommentArea book={selectedBook} />
              ) : (
                <h4>The selected book has no comments.</h4>
              )
            ) : (
              <div>
                <h4>Select a book to see comments and details.</h4>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainSezione;
