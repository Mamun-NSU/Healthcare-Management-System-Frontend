import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReviewCart from "./ReviewCart";
import axios from "axios";

const ReviewCartList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8600/reviews/all");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Container>
      <h1 className="text-success">My Reviews</h1>
      <Row>
        {reviews.map((review) => (
          <Col key={review.reviewId} lg={4} md={6} sm={12}>
            <ReviewCart review={review} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewCartList;
