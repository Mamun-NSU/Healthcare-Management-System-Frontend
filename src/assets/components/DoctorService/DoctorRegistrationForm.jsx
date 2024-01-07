// import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/globalStyles.css";
import { axiosInstanceDoctorService } from "../../utils/axiosInstanceHMSApp";

const DoctorRegistrationForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const doctorData = {
        dfirstName: data.dfirstName,
        dlastName: data.dlastName,
        dgender: data.dgender,
        email: data.email,
        doctorImage: data.doctorImage,
        password: data.password,
        specialities: data.specialities
          .split(",")
          .map((speciality) => speciality.trim()),
        qualifications: data.qualifications
          .split(",")
          .map((qualification) => qualification.trim()),
      };

      console.log("doctorData:", doctorData);
      const resp = await axiosInstanceDoctorService.post(
        "/doctors/register",
        doctorData
      );
      console.log("Doctor Registration Response", resp.data);
      toast.success("Doctor registered successfully!!!");
      navigate("/login");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Doctor Registration</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        {/* Include the fields for Doctor registration */}
        <div className="form-group">
          <h4>First Name</h4>
          <Controller
            name="dfirstName"
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
            name="dlastName"
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
          <h4>Gender</h4>
          <Controller
            name="dgender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                className="form-control"
                placeholder="Select Gender"
                {...field}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
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
          <h4>Specialities</h4>
          <Controller
            name="specialities"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Specialities (comma separated)"
                {...field}
              />
            )}
          />
        </div>

        <div className="form-group">
          <h4>Qualifications</h4>
          <Controller
            name="qualifications"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Qualifications (comma separated)"
                {...field}
              />
            )}
          />
        </div>
        <div className="form-group">
          <h4>Doctor Image URL</h4>
          <Controller
            name="doctorImage"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Doctor Image URL"
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
          Register Doctor
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default DoctorRegistrationForm;
