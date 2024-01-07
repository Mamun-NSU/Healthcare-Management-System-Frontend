import { Card } from "react-bootstrap";
import { Rate } from "antd";

const ReviewCart = ({ review }) => {
  return (
    <Card
      className="my-3"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Card.Body style={{ padding: "15px" }}>
        <Card.Title>
          <strong>Rating:</strong>{" "}
          <Rate allowHalf defaultValue={review.rating} disabled />
        </Card.Title>
        <Card.Text>
          <strong>Comment:</strong> {review.comment}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCart;
