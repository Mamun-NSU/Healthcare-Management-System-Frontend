import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstancePharmaceuticalService } from "../../utils/axiosInstanceHMSApp";
import { useNavigate } from "react-router-dom";

const AddEquipmentRoomForm = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const roomData = {
        roomNo: data.roomNo,
      };

      const resp = await axiosInstancePharmaceuticalService.post(
        "/equipment-rooms/add",
        roomData
      );
      console.log("Room Addition Response", resp.data);
      toast.success("Room added successfully!!!");
      navigate("/equipmentRooms");
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">Add Room</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <Form.Group controlId="formRoomNo">
          <Form.Label>Room Number</Form.Label>
          <Controller
            name="roomNo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Enter Room Number"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Add Room
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddEquipmentRoomForm;
