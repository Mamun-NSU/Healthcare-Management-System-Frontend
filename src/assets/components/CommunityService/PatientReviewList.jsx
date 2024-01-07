import { useState, useEffect } from "react";
import PatientReview from "./PatientReview";
import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

const PatientReviewList = () => {
  const [review, setReview] = useState(null); // Use null as the initial state for a single review
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstanceCommunityPortalService.get(
          `/reviews/find/${userId}`
        );
        const responseData = response.data;

        if (Array.isArray(responseData)) {
          // If it's an array, set the first review
          setReview(responseData.length > 0 ? responseData[0] : null);
        } else {
          // If it's a single object, set it as is
          setReview(responseData || null);
        }

        console.log("review data:", responseData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [userId]);

  return (
    <div>
      <h1 className="text-success">My Review</h1>
      {review ? (
        <PatientReview key={review.reviewId} review={review} />
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default PatientReviewList;
