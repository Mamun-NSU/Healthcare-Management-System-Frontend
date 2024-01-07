import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Button } from "react-bootstrap";
import "../../css/globalStyles.css";
import { axiosInstancePatientService } from "../../utils/axiosInstanceHMSApp";

const CreatePatientHealthDataForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const healthData = {
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        highBloodPressure: parseFloat(data.highBloodPressure),
        lowBloodPressure: parseFloat(data.lowBloodPressure),
        heartRate: parseFloat(data.heartRate),
        sugarLevel: data.sugarLevel,
        diabetesStatus: data.diabetesStatus,
        allergies: data.allergies,
      };

      console.log("healthData: ", healthData);

      // Assuming you have a way to obtain the patient ID, replace 'PATIENT_ID' with the actual patient ID
      const resp = await axiosInstancePatientService.post(
        `/health/add`,
        healthData
      );
      console.log("Health Data Submission Response", resp.data);
      toast.success("Health data submitted successfully!!!");
      navigate("/patientHealthDetails");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="myContainer">
      <h1 className="text-success"> Health Data Form</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ paddingTop: "20px", maxWidth: "300px", margin: "0 auto" }}
      >
        {/* Include the fields for Patient Health Data */}
        <Form.Group controlId="formHeight">
          <Form.Label>Height</Form.Label>
          <Controller
            name="height"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Height"
                step="0.1"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formWeight">
          <Form.Label>Weight</Form.Label>
          <Controller
            name="weight"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Weight"
                step="0.1"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formHighBloodPressure">
          <Form.Label>High Blood Pressure</Form.Label>
          <Controller
            name="highBloodPressure"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter High Blood Pressure"
                step="0.1"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formLowBloodPressure">
          <Form.Label>Low Blood Pressure</Form.Label>
          <Controller
            name="lowBloodPressure"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Low Blood Pressure"
                step="0.1"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formHeartRate">
          <Form.Label>Heart Rate</Form.Label>
          <Controller
            name="heartRate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="number"
                placeholder="Enter Heart Rate"
                step="0.1"
                {...field}
              />
            )}
          />
        </Form.Group>

        <Form.Group controlId="formSugarLevel">
          <Form.Label>Sugar Level</Form.Label>
          <Controller
            name="sugarLevel"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                as="select"
                placeholder="Select Sugar Level"
                {...field}
              >
                <option value="HIGH">High</option>
                <option value="NORMAL">Normal</option>
                <option value="LOW">Low</option>
              </Form.Control>
            )}
          />
        </Form.Group>
        <Form.Group controlId="formDiabetesStatus">
          <Form.Label>Diabetes Status</Form.Label>
          <Controller
            name="diabetesStatus"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                as="select"
                placeholder="Select Diabetes Status"
                {...field}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </Form.Control>
            )}
          />
        </Form.Group>

        <Form.Group controlId="formAllergies">
          <Form.Label>Allergies</Form.Label>
          <Controller
            name="allergies"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                as="select"
                placeholder="Select Allergies"
                {...field}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </Form.Control>
            )}
          />
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginTop: "20px" }}>
          Submit Health Data
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CreatePatientHealthDataForm;
