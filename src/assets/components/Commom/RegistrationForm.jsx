import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstanceLibraryService from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/globalStyles.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const resp = await axiosInstanceLibraryService.post(
        "/user/register",
        data
      );
      console.log("The Response", resp.data);
      toast.success("User registered successfully!!!");
      navigate("/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1>Registration</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <div className="form-group">
          <h4>First Name</h4>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Last Name</h4>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Email</h4>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Password</h4>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Address</h4>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Address"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Role</h4>
          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Role"
                {...field}
              />
            )}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default RegistrationForm;
