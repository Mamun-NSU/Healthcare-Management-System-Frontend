import { Card } from "react-bootstrap";

const PatientAppointment = ({ appointment }) => {
  console.log("appointment", appointment);
  let statusColor = "";

  switch (appointment.appointmentType) {
    case "ONLINE":
      statusColor = "text-success";
      break;
    case "OFLINE":
      statusColor = "text-danger";
      break;
    default:
      break;
  }
  return (
    <Card
      className="my-3"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "1.5rem" }}
    >
      <Card.Body>
        <Card.Title>
          <strong className="text-success">{`Appointment with ${appointment.doctorName}`}</strong>
        </Card.Title>
        <Card.Text className="mb-2">
          <strong>Patient ID:</strong> {appointment.patientId}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>DoctorID:</strong> {appointment.doctorId}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Appointment Date:</strong> {appointment.appointmentDate}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Appointment Time:</strong> {appointment.appointmentTime}
        </Card.Text>
        <Card.Text className={`mb-2`}>
          <strong>Status: {appointment.status}</strong>
        </Card.Text>
        <Card.Text className={`mb-2 ${statusColor}`}>
          <strong>Status: {appointment.appointmentType}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PatientAppointment;
