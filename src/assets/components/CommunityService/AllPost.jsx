import { Card } from "react-bootstrap";

const AllPost = ({ post }) => {
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
        <Card.Text className="mb-2">
          <strong>Title:</strong> {post.title}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Text:</strong> {post.text}
        </Card.Text>
        <Card.Text className="mb-2 text-success">
          <strong>Posted by:</strong> {post.patientId}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AllPost;
