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
          <Col lg={12} className="d-flex justify-content-between">
            <ul className="d-flex gap-4 text-light list-unstyled">
              <Link to="/Home" target="_blank">
                <li>Home</li>
              </Link>
              <Link to="/About">
                <li>About</li>
              </Link>
              <Link to="/Browse">
                <li>Browse</li>
              </Link>
            </ul>
            <div className="d-flex justify-content-center align-items-center">
              <InputBooks />

              <Button variant="info" onClick={toggleDarkMode} className="ms-1">
                dark mode
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </nav>
  );
};

export default MyNav;
