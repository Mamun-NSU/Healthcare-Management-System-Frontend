import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstancePatientService } from "../../utils/axiosInstanceHMSApp";
import { useNavigate } from "react-router-dom";

const UpdatedPatientHealthDataForm = ({ patientHealthData, onUpdate }) => {
  const navigate = useNavigate();
  const [updatedHealthData, setUpdatedHealthData] = useState(patientHealthData);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHealthData({ ...updatedHealthData, [name]: value });
  };

  const handleUpdateHealthData = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axiosInstancePatientService
      .put(`/health/update`, updatedHealthData)
      .then((resp) => {
        console.log("Patient Health Data Updated:", resp);
        setIsUpdated(true);
        onUpdate(updatedHealthData);
        toast.success("Patient Health Data Updated successfully!!!");
        navigate(`/patientHealthDetails`);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error);
        toast.error("Error updating Patient Health Data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setUpdatedHealthData(patientHealthData);
  }, [patientHealthData]);

  return (
    <Form onSubmit={handleUpdateHealthData}>
      {/* Existing form fields */}
      <Form.Group>
        <Form.Label>Height</Form.Label>
        <Form.Control
          type="number"
          name="height"
          value={updatedHealthData.height}
          onChange={handleInputChange}
        />
      </Form.Group>

      {/* Add new form fields */}
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={updatedHealthData.weight}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>High Blood Pressure</Form.Label>
        <Form.Control
          type="number"
          name="highBloodPressure"
          value={updatedHealthData.highBloodPressure}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Low Blood Pressure</Form.Label>
        <Form.Control
          type="number"
          name="lowBloodPressure"
          value={updatedHealthData.lowBloodPressure}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Heart Rate</Form.Label>
        <Form.Control
          type="number"
          name="heartRate"
          value={updatedHealthData.heartRate}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Sugar Level</Form.Label>
        <Form.Control
          as="select"
          name="sugarLevel"
          value={updatedHealthData.sugarLevel}
          onChange={handleInputChange}
        >
          <option value="HIGH">High</option>
          <option value="NORMAL">Normal</option>
          <option value="LOW">Low</option>
        </Form.Control>
      </Form.Group>

      {/* New form fields */}
      <Form.Group>
        <Form.Label>Diabetes Status</Form.Label>
        <Form.Control
          as="select"
          name="diabetesStatus"
          value={updatedHealthData.diabetesStatus}
          onChange={handleInputChange}
        >
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Allergies</Form.Label>
        <Form.Control
          as="select"
          name="allergies"
          value={updatedHealthData.allergies}
          onChange={handleInputChange}
        >
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </Form.Control>
      </Form.Group>

      <Button className="greenButton" type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Patient Health Data"}
      </Button>

      {isUpdated && (
        <div style={{ color: "green", marginTop: "20px" }}>
          Patient Health Data Updated Successfully
        </div>
      )}
      <ToastContainer />
    </Form>
  );
};

export default UpdatedPatientHealthDataForm;
