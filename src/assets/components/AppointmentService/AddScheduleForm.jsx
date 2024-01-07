import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import "../../css/globalStyles.css";
import { axiosInstanceAppointmentService } from "../../utils/axiosInstanceHMSApp";

const AddScheduleForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const formatDateTime = (date, time) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const formattedTime = time + ":00";
    return { formattedDate, formattedTime };
  };

  const onSubmit = async (data) => {
    try {
      const { formattedDate, formattedTime } = formatDateTime(
        data.availableDay,
        data.startTime
      );

      const scheduleData = {
        availableDay: formattedDate,
        startTime: formattedTime,
        timePerPatient: parseInt(data.timePerPatient),
        patientNumbers: parseInt(data.patientNumbers),
        appointmentType: data.appointmentType,
      };

      console.log("Schedule data", scheduleData);

      const resp = await axiosInstanceAppointmentService.post(
        "/doctors/schedule",
        scheduleData
      );

      console.log("Schedule Addition Response", resp.data);
      toast.success("Schedule added successfully!!!");
      navigate("/doctorDashboard");
    } catch (error) {
      console.error("Error adding schedule:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  return (
    <div className="myContainer">
      <h1>Add Schedule</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        <Form.Group controlId="formAvailableDay">
          <Form.Label>Available Day</Form.Label>
          <Controller
            name="availableDay"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="date"
                placeholder="Enter Available Day"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formStartTime">
          <Form.Label>Start Time</Form.Label>
          <Controller
            name="startTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="time"
                placeholder="Enter Start Time"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formTimePerPatient">
          <Form.Label>Time Per Patient (minutes)</Form.Label>
          <Controller
            name="timePerPatient"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Time Per Patient"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formPatientNumbers">
          <Form.Label>Patient Numbers</Form.Label>
          <Controller
            name="patientNumbers"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Patient Numbers"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formAppointmentType">
          <Form.Label>Appointment Type</Form.Label>
          <Controller
            name="appointmentType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                className="form-control"
                placeholder="Select Appointment Type"
                {...field}
              >
                <option value="" disabled>
                  Select Appointment Type
                </option>
                <option value="OFFLINE">Offline</option>
                <option value="ONLINE">Online</option>
              </select>
            )}
          />
        </Form.Group>

        <Button type="submit" variant="success" style={{ marginTop: "20px" }}>
          Add Schedule
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddScheduleForm;
