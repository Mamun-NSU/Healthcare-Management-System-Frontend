import { Card } from "react-bootstrap";

const PatientHealthDetails = ({ healthData }) => {
  const {
    patient,
    height,
    weight,
    highBloodPressure,
    lowBloodPressure,
    heartRate,
    sugarLevel,
    diabetesStatus,
    allergies,
  } = healthData;

  const getTextColor = () => {
    if (sugarLevel === "HIGH") {
      return "text-danger";
    } else if (sugarLevel === "NORMAL") {
      return "text-success";
    } else if (sugarLevel === "LOW") {
      return "text-warning";
    } else {
      return "";
    }
  };

  const getTextColor2 = (value) => {
    return value === "YES" ? "text-danger" : "text-success";
  };

  return (
    <Card className="p-4 my-4">
      <Card.Title className="mb-4">
        <strong className="text-success">{`My ID: ${patient.patientId}`}</strong>
      </Card.Title>
      <Card.Text className="mb-2">
        <strong>Name:</strong> {`${patient.firstName} ${patient.lastName}`}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Gender:</strong> {patient.gender}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Phone Number:</strong> {patient.phoneNo}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Blood Group:</strong> {patient.bloodGroup}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Date of Birth:</strong> {patient.dateOfBirth}
      </Card.Text>
      <Card.Title className="mb-3">Health Metrics:</Card.Title>
      <Card.Text className="mb-2">
        <strong>Height:</strong> {`${height} cm`}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Weight:</strong> {`${weight} kg`}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>High Blood Pressure:</strong> {highBloodPressure}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Low Blood Pressure:</strong> {lowBloodPressure}
      </Card.Text>
      <Card.Text className="mb-2">
        <strong>Heart Rate:</strong> {heartRate}
      </Card.Text>
      <Card.Text className={`mb-2 ${getTextColor2(diabetesStatus)}`}>
        <strong>Diabetes Status:</strong> {diabetesStatus}
      </Card.Text>
      <Card.Text className={`mb-2 ${getTextColor2(allergies)}`}>
        <strong>Allergies:</strong> {allergies}
      </Card.Text>
      <Card.Text className={`mb-2 ${getTextColor()}`}>
        <strong>Sugar Level:</strong> {sugarLevel}
      </Card.Text>
    </Card>
  );
};

export default PatientHealthDetails;
