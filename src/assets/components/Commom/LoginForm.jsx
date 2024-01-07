import { useForm, Controller } from "react-hook-form";
import "../../css/globalStyles.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstanceUserService } from "../../utils/axiosInstanceHMSApp";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = {
        email: data.email,
        password: data.password,
      };

      const resp = await axiosInstanceUserService.post(
        "users/login",
        userCredential
      );
      const responseData = resp.data;

      console.log("Response from login:", responseData);
      console.log("UserId from login:", responseData.userId);

      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("role", responseData.Role);
      localStorage.setItem("token", responseData.accessToken);
      toast.success("User LogIn successfully!!!");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="myContainer">
      <Row>
        <Col
          col="12"
          md="6"
          style={{
            marginTop: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://healthcarentsickcare.com/cdn/shop/articles/what-is-healthcare-707998.png?v=1677580538"
            width={750}
            className="img-fluid"
            alt="Sample image"
          />
        </Col>

        <Col
          col="12"
          md="6"
          style={{
            marginTop: "30px",
          }}
        >
          <h1 className="text-success">Login Page</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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
                    placeholder="Enter email"
                    value={field.value}
                    onChange={field.onChange}
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
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <button
                className="mb-0 px-5 btn btn-success"
                size="lg"
                onClick={onSubmit}
              >
                Login
              </button>
              <p className="medium fw-bold mt-2 pt-1 mb-2">
                Do not have an account? Register for{" "}
                <div style={{ display: "flex", gap: "20px" }}>
                  <Link to="/doctorRegistration">
                    <div className="text-success">Doctor</div>
                  </Link>
                  <Link to="/patientRegistration">
                    <div className="text-success">Patient</div>
                  </Link>
                </div>
              </p>
            </div>
          </form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
