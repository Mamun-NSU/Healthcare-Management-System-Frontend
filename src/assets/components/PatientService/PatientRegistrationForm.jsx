import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import "../../css/globalStyles.css";
import { axiosInstancePatientService } from "../../utils/axiosInstanceHMSApp";

const PatientRegistrationForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const patientData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNo: data.phoneNo,
        password: data.password,
        bloodGroup: data.bloodGroup,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        patientImage: data.patientImage,
        age: data.age,
      };

      const resp = await axiosInstancePatientService.post(
        "/patients/register",
        patientData
      );
      console.log("Patient Registration Response", resp.data);
      toast.success("Patient registered successfully!!!");
      navigate("/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1>Patient Registration</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Email" {...field} />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNo">
          <Form.Label>Phone Number</Form.Label>
          <Controller
            name="phoneNo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="password"
                placeholder="Enter Password"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formBloodGroup">
          <Form.Label>Blood Group</Form.Label>
          <Controller
            name="bloodGroup"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                className="form-control"
                placeholder="Select Blood Group"
                {...field}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A_POSITIVE">A Positive</option>
                <option value="A_NEGATIVE">A Negative</option>
                <option value="B_POSITIVE">B Positive</option>
                <option value="B_NEGATIVE">B Negative</option>
                <option value="O_POSITIVE">O Positive</option>
                <option value="O_NEGATIVE">O Negative</option>
                <option value="AB_POSITIVE">AB Positive</option>
                <option value="AB_NEGATIVE">AB Negative</option>
                <option value="OTHER">Other</option>
              </select>
            )}
          />
        </Form.Group>

        <Form.Group controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control as="select" placeholder="Select Gender" {...field}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Form.Control>
            )}
          />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Date of Birth"
                {...field}
              />
            )}
          />
        </Form.Group>
        <Form.Group controlId="formPatientImage">
          <Form.Label>Patient Image URL</Form.Label>
          <Controller
            name="patientImage"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Patient Image URL"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Controller
            name="age"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control type="number" placeholder="Enter Age" {...field} />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Register Patient
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default PatientRegistrationForm;
