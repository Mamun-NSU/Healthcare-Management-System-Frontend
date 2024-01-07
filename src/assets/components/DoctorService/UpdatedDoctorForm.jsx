import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstanceDoctorService } from "../../utils/axiosInstanceHMSApp";
import { useNavigate } from "react-router-dom";

const UpdatedDoctorForm = ({ doctor, onUpdate }) => {
  const navigate = useNavigate();
  const [updatedDoctor, setUpdatedDoctor] = useState(doctor);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "specialities" || name === "qualifications") {
      const arrayValue = value.split(",").map((item) => item.trim());
      setUpdatedDoctor({
        ...updatedDoctor,
        [name]: arrayValue,
      });
    } else {
      setUpdatedDoctor({ ...updatedDoctor, [name]: value });
    }
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axiosInstanceDoctorService
      .put(`/doctors/update-doctor`, updatedDoctor)
      .then((resp) => {
        console.log("Doctor Updated:", resp);
        setIsUpdated(true);
        onUpdate(updatedDoctor);
        toast.success("Doctor Updated successfully!!!");
        navigate(`/doctorDetails`);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error);
        toast.error("Please provide valid data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setUpdatedDoctor(doctor);
  }, [doctor]);

  return (
    <Form onSubmit={handleUpdateDoctor}>
      <Form.Group>
        <Form.Label>Specialities</Form.Label>
        <Form.Control
          type="text"
          name="specialities"
          value={updatedDoctor.specialities}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Qualifications</Form.Label>
        <Form.Control
          type="text"
          name="qualifications"
          value={updatedDoctor.qualifications}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Doctor"}
      </Button>

      {isUpdated && (
        <div style={{ color: "green", marginTop: "20px" }}>
          Doctor Updated Successfully
        </div>
      )}
      <ToastContainer />
    </Form>
  );
};

export default UpdatedDoctorForm;
