import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "react-bootstrap";
import "./SingleBook.css";

const SingleBook = ({ img, category, title, price }) => {
  return (
    <Col
      sm={12}
      className="d-flex justify-content-center align-items-center mt-1"
    >
      <Card className="custom-card">
        {" "}
        <CardImg variant="top" className="object-fit-cover" src={img} />
        <CardBody>
          <CardTitle className="text-center card-title">{title}</CardTitle>
          <CardText className="text-center">
            <h5 className="card-text">Category</h5>
            {category}
          </CardText>
          <CardText className="text-center">
            <h5 className="card-text">Price</h5>
            {price} €
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SingleBook;
