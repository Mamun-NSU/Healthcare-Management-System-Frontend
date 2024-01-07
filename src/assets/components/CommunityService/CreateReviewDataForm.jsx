import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

const CreateReviewDataForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const userId = localStorage.getItem("userId");
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const checkReviewStatus = async () => {
      try {
        const response = await axiosInstanceCommunityPortalService.get(
          `/reviews/find/${userId}`
        );
        const reviewsData = response.data;
        setHasReviewed(reviewsData.length > 0);
      } catch (error) {
        console.error("Error checking review status:", error);
      }
    };

    checkReviewStatus();
  }, [userId]);

  console.log("hasReviewed value", hasReviewed);
  const onSubmit = async (data) => {
    try {
      if (hasReviewed) {
        toast.error("You have already reviewed. Cannot submit again!");
        Navigate("/patientReviews");
        // return;
      }

      const reviewData = {
        rating: parseInt(data.rating),
        comment: data.comment,
        patientId: userId,
      };

      const resp = await axiosInstanceCommunityPortalService.post(
        `/reviews/add/${userId}`,
        reviewData
      );
      console.log("Review Submission Response", resp.data);
      toast.success("Review submitted successfully!!!");
      navigate("/patientReviews");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Review Form</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        {/* Include the fields for Review Data */}
        <Form.Group controlId="formRating">
          <Form.Label>Rating</Form.Label>
          <Controller
            name="rating"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Rating"
                min="1"
                max="5"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formComment">
          <Form.Label>Comment</Form.Label>
          <Controller
            name="comment"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Comment"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Submit Review
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CreateReviewDataForm;

// // import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Form, Button } from "react-bootstrap";
// import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

// const CreateReviewDataForm = () => {
//   const navigate = useNavigate();
//   const { control, handleSubmit } = useForm();
//   const userId = localStorage.getItem("userId");

//   const onSubmit = async (data) => {
//     try {
//       const reviewData = {
//         rating: parseInt(data.rating),
//         comment: data.comment,
//         patientId: userId,
//       };

//       const resp = await axiosInstanceCommunityPortalService.post(
//         `/reviews/add/${userId}`,
//         reviewData
//       );
//       console.log("Review Submission Response", resp.data);
//       toast.success("Review submitted successfully!!!");
//       navigate("/patientReviews");
//     } catch (error) {
//       console.error("Error", error);
//     }
//   };

//   return (
//     <div className="myContainer">
//       <h1>Review Data Form</h1>
//       <Form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
//       >
//         {/* Include the fields for Review Data */}
//         <Form.Group controlId="formRating">
//           <Form.Label>Rating</Form.Label>
//           <Controller
//             name="rating"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <Form.Control
//                 type="number"
//                 placeholder="Enter Rating"
//                 min="1"
//                 max="5"
//                 {...field}
//               />
//             )}
//           />
//         </Form.Group>

//         <Form.Group controlId="formComment">
//           <Form.Label>Comment</Form.Label>
//           <Controller
//             name="comment"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter Comment"
//                 {...field}
//               />
//             )}
//           />
//         </Form.Group>

//         <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
//           Submit Review
//         </Button>
//       </Form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateReviewDataForm;
