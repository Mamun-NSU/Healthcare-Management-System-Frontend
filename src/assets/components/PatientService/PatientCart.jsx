import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import isPatient from "../Authenticate/isPatient";

const PatientCard = ({ patient }) => {
  const userId = localStorage.getItem("userId");
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
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
    <Card className="patient-card">
      {patient.patientImage && (
        <img
          className="patient-card-image"
          src={patient.patientImage}
          alt={`${patient.firstName} ${patient.lastName}`}
          style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
        />
      )}
      <Card.Body>
        <Card.Title>{`${patient.firstName} ${patient.lastName}`}</Card.Title>
        <Card.Text>Patient ID: {patient.patientId}</Card.Text>
        <Card.Text>Gender: {patient.gender}</Card.Text>
        <Card.Text>Phone No: {patient.phoneNo}</Card.Text>
        <Card.Text>Blood Group: {patient.bloodGroup}</Card.Text>
        <Card.Text>
          Date of Birth: {calculateAge(patient.dateOfBirth)} years
        </Card.Text>

        {isPatient() && userId == patient.patientId && (
          <>
            <Link to="/patientDetails" style={{ textDecoration: "none" }}>
              <Button variant="primary" style={{ marginRight: "10px" }}>
                Details
              </Button>
            </Link>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default PatientCard;
