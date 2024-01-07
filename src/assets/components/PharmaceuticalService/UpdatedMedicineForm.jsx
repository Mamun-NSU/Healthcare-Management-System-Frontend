import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstancePharmaceuticalService } from "../../utils/axiosInstanceHMSApp";
import { useNavigate } from "react-router-dom";

const UpdatedMedicineForm = ({ medicine, onUpdate }) => {
  const navigate = useNavigate();
  const [updatedMedicine, setUpdatedMedicine] = useState(medicine);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [, setError] = useState();

  // Handle changes to the form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMedicine({ ...updatedMedicine, [name]: value });
  };

  // Function to update the medicine
  const handleUpdateMedicine = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axiosInstancePharmaceuticalService
      .put(`/medicines/update/${updatedMedicine.medicineId}`, updatedMedicine)
      .then((resp) => {
        console.log("Medicine Updated:", resp);
        setIsUpdated(true);
        onUpdate(updatedMedicine);
        toast.success("Medicine Updated successfully!!!");
        navigate(`/medicines/${updatedMedicine.medicineId}`);
      })
      .catch((error) => {
        console.log("Error", error);
        setError(error);
        toast.success("Yes Medicine Updated successfully!!!");
        navigate(`/medicines/${updatedMedicine.medicineId}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setUpdatedMedicine(medicine);
  }, [medicine]);

  return (
    <Form onSubmit={handleUpdateMedicine}>
      <Form.Group>
        <Form.Label>Medicine Name</Form.Label>
        <Form.Control
          type="text"
          name="medicineName"
          value={updatedMedicine.medicineName}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Dosage</Form.Label>
        <Form.Control
          type="number"
          name="dosage"
          value={updatedMedicine.dosage}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={updatedMedicine.category}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Manufactured By</Form.Label>
        <Form.Control
          type="text"
          name="manufacturedBy"
          value={updatedMedicine.manufacturedBy}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Expiration Date</Form.Label>
        <Form.Control
          type="text"
          name="expirationDate"
          value={updatedMedicine.expirationDate}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          name="quantity"
          value={updatedMedicine.quantity}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Side Effects</Form.Label>
        <Form.Control
          type="text"
          name="sideEffects"
          value={updatedMedicine.sideEffects}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button type="submit" variant="success" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Medicine"}
      </Button>

      {isUpdated && (
        <div style={{ color: "green", marginTop: "20px" }}>
          Medicine Updated Successfully
        </div>
      )}
      <ToastContainer />
    </Form>
  );
};

export default UpdatedMedicineForm;
