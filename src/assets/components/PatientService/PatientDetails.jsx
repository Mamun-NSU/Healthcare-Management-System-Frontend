import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PatientDetails = ({ patientDetails }) => {
  const {
    firstName,
    lastName,
    gender,
    bloodGroup,
    dateOfBirth,
    // patientId,
    phoneNo,
    patientImage,
  } = patientDetails;
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <Card
      className="patient-card mb-3"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Card.Body>
        <Card.Title className="mb-3">
          <strong>{`${firstName} ${lastName}`}</strong>
        </Card.Title>
        {/* <Card.Text className="mb-2">
          <strong>Patient ID:</strong> {patientId}
        </Card.Text> */}
        <Card.Text className="mb-2">
          <strong>Gender:</strong> {gender}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Phone No:</strong> {phoneNo}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Blood Group:</strong> {bloodGroup}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Date of Birth:</strong> {dateOfBirth}
        </Card.Text>
        {patientImage && (
          <Card.Img
            className="patient-card-image"
            variant="top"
            src={patientImage}
            alt={`${firstName} ${lastName}`}
          />
        )}
        <Card.Text className="mb-2">
          <strong>Age:</strong> {calculateAge(dateOfBirth)} years
        </Card.Text>

        <Link to="/patientHealthDetails">
          <Button variant="primary">Health Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PatientDetails;
