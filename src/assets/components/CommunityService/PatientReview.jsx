import { Card } from "react-bootstrap";
import { Rate } from "antd";

const PatientReview = ({ review }) => {
  return (
    <Card
      className="my-3"
      style={{
        padding: "15px",
        margin: "10px 0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <Card.Body>
        {/* <Card.Title style={{ fontWeight: "bold" }}>
          Review ID: {review.reviewId}
        </Card.Title>
        <Card.Text style={{ marginBottom: "10px" }}>
          Patient ID: {review.patientId}
        </Card.Text> */}
        <Card.Text>
          Rating: <Rate allowHalf defaultValue={review.rating} disabled />
        </Card.Text>
        <Card.Text style={{ marginBottom: "10px" }}>
          Comment: {review.comment}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PatientReview;
