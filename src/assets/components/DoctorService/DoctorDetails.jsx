import { Card } from "react-bootstrap";

const DoctorDetails = ({ doctorDetails }) => {
  const {
    doctorImage,
    dfirstName,
    dlastName,
    dgender,
    qualifications = [],
    specialities = [],
    room,
    doctorId,
  } = doctorDetails;

  return (
    <Card>
      <Card.Img
        className="doctor-card-image"
        variant="top"
        src={doctorImage}
        alt={`${dfirstName} ${dlastName}`}
        style={{ width: "200px", height: "200px" }}
      />
      <Card.Body>
        <Card.Title className="text-success">{`${dfirstName} ${dlastName}`}</Card.Title>
        <Card.Text>Doctor ID: {doctorId}</Card.Text>
        <Card.Text>Gender: {dgender}</Card.Text>
        <Card.Text>Specialities: {specialities.join(", ")}</Card.Text>
        <Card.Text>Qualifications: {qualifications.join(", ")}</Card.Text>
        <Card.Text>
          Room: {room ? `Room ${room.roomNo}` : "Not Assigned"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DoctorDetails;
