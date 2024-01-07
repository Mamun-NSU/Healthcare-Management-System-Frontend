import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import { axiosInstanceCommunityPortalService } from "../../utils/axiosInstanceHMSApp";

const CreatePostDataForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const userId = localStorage.getItem("userId");

  const onSubmit = async (data) => {
    try {
      const postData = {
        patientId: userId,
        title: data.title,
        text: data.content, // Assuming "text" corresponds to the content of the post
      };

      const resp = await axiosInstanceCommunityPortalService.post(
        `/posts/add/${userId}`,
        postData
      );
      console.log("Post Submission Response", resp.data);
      toast.success("Post submitted successfully!!!");
      navigate("/patientPosts");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Post here</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        {/* Include the fields for Post Data */}
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Title" {...field} />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Content"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Submit Post
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CreatePostDataForm;
