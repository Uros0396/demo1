import { Container, Row, Col, Button } from "react-bootstrap";
import InputBooks from "../InputBooks/InputBooks";
import { useContext } from "react";
import { DarkContext } from "../../contexts/DarkContext";
import { Link } from "react-router-dom";
import "./MyNav.css";

const MyNav = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkContext);

  return (
    <nav>
      <Container
        fluid
        className={`fixed-top ${isDarkMode ? "bg-black" : "bg-info"}`}
      >
        <Row>
          <Col
            lg={12}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="d-flex justify-content-center align-items-center gap-5 text-primary">
              <h1>
                <em>Epibooks</em>
              </h1>

              <ul className="d-flex justify-content-center align-items-center gap-4 text-light list-unstyled m-0">
                <Link to="/Home" className="text-decoration-none">
                  <li>Home</li>
                </Link>
                <Link to="/About" className="text-decoration-none">
                  <li>About</li>
                </Link>
                <Link to="/Browse" className="text-decoration-none">
                  <li>Browse</li>
                </Link>
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <InputBooks />

              <Button
                variant="info"
                onClick={toggleDarkMode}
                className={`${
                  isDarkMode ? "bg-black && text-info" : "text-primary"
                }`}
              >
                <em>Change Mode</em>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default MyNav;
