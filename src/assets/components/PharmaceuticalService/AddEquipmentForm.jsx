import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstancePharmaceuticalService } from "../../utils/axiosInstanceHMSApp";

const AddEquipmentForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const equipmentData = {
        name: data.name,
        description: data.description,
        manufacturer: data.manufacturer,
        purchaseDate: data.purchaseDate,
        equipmentRoom: {
          //   roomId: data.roomId,
          roomNo: data.roomNo,
          roomStatus: "OCCUPIED", // Assuming it's occupied when adding
        },
      };

      const resp = await axiosInstancePharmaceuticalService.post(
        "/equipment/add",
        equipmentData
      );
      console.log("Equipment Addition Response", resp.data);
      toast.success("Medical equipment added successfully!!!");
      navigate("/equipments");
    } catch (error) {
      console.error("Error adding medical equipment:", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Add Medical Equipment</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control type="text" placeholder="Enter Name" {...field} />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Description"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formManufacturer">
          <Form.Label>Manufacturer</Form.Label>
          <Controller
            name="manufacturer"
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

        <Form.Group controlId="formPurchaseDate">
          <Form.Label>Purchase Date</Form.Label>
          <Controller
            name="purchaseDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Purchase Date"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Add Medical Equipment
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddEquipmentForm;
