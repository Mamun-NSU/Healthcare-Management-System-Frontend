import { Card } from "react-bootstrap";

const PatientPost = ({ post }) => {
  return (
    <Card
      className="my-3"
      style={{
        padding: "15px",
        margin: "10px",
        transition: "transform 0.2s",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body>
        {/* <Card.Title className="mb-3">
          <strong>Post ID:</strong> {post.postId}
        </Card.Title>
        <Card.Text className="mb-2">
          <strong>Patient ID:</strong> {post.patientId}
        </Card.Text> */}
        <Card.Text className="mb-2">
          <strong>Title:</strong> {post.title}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Text:</strong> {post.text}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Post Time:</strong> {post.postTime}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PatientPost;
