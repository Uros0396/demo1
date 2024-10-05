import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "react-bootstrap"
import "./SingleBook.css";


const SingleBook = ({img, category, title, price}) => {


    return (
         <Col sm={12} className="d-flex justify-content-center align-items-center mt-5">
           <Card
            className="h-25, w-25"
           >
            <CardImg
              variant="top"
              className="h-100 w-100 object-fit-content"
              src={img}
            />
            <CardBody>
                <CardTitle>
                    {category}
                </CardTitle>
                <CardText>
                    {title}
                </CardText>
                <CardText>
                    {price}
                </CardText>
            </CardBody>
            </Card>
         </Col>
    )
}

export default SingleBook