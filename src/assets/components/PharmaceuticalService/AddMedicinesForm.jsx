import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import "../../css/globalStyles.css";
import { axiosInstancePharmaceuticalService } from "../../utils/axiosInstanceHMSApp";

const AddMedicinesForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const sideEffectsArray = data.sideEffects
        .split(",")
        .map((effect) => effect.trim());
      const sideEffectsString = `"${sideEffectsArray.join(", ")}"`;

      const medicineData = {
        medicineName: data.medicineName,
        dosage: parseInt(data.dosage),
        category: data.category,
        manufacturedBy: data.manufacturedBy,
        expirationDate: data.expirationDate,
        quantity: parseInt(data.quantity),
        sideEffects: sideEffectsString,
      };

      console.log("Medicine data", medicineData);

      const resp = await axiosInstancePharmaceuticalService.post(
        "/medicines/add",
        medicineData
      );
      console.log("Medicine Addition Response", resp.data);
      toast.success("Medicine added successfully!!!");
      navigate("/medicines");
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Add Medicines</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <Form.Group controlId="formMedicineName">
          <Form.Label>Medicine Name</Form.Label>
          <Controller
            name="medicineName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Medicine Name"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formDosage">
          <Form.Label>Dosage</Form.Label>
          <Controller
            name="dosage"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Dosage"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Controller
            name="category"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                className="form-control"
                placeholder="Select Category"
                {...field}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Syrup">Syrup</option>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Drops">Drops</option>
                <option value="Suppositories">Suppositories</option>
                <option value="Topical">Topical</option>
                <option value="Inhaler">Inhaler</option>
                <option value="Injections">Injections</option>
              </select>
            )}
          />
        </Form.Group>

        <Form.Group controlId="formManufacturedBy">
          <Form.Label>Manufactured By</Form.Label>
          <Controller
            name="manufacturedBy"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Manufacturer"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formExpirationDate">
          <Form.Label>Expiration Date</Form.Label>
          <Controller
            name="expirationDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Expiration Date"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Controller
            name="quantity"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Quantity"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formSideEffects">
          <Form.Label>Side Effects</Form.Label>
          <Controller
            name="sideEffects"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Side Effects (comma separated)"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="success" style={{ marginTop: "20px" }}>
          Add Medicine
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddMedicinesForm;
