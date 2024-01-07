import { Card } from "react-bootstrap";

const DoctorAppointment = ({ appointment }) => {
  const statusColor = appointment.status === "UPCOMING" ? "text-success" : "";

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Text>
          <strong>Patient Name:</strong>{" "}
          <strong className="font-weight-bold">
            {appointment.patientName}
          </strong>
        </Card.Text>

        <Card.Text>
          <strong>Date:</strong> {appointment.appointmentDate}
        </Card.Text>
        <Card.Text>
          <strong>Time:</strong> {appointment.appointmentTime}
        </Card.Text>
        <Card.Text>
          <strong>Status:</strong>
          <strong className={statusColor}>{appointment.status}</strong>
        </Card.Text>
        <Card.Text>
          <strong>Serial Number:</strong> {appointment.serialNumber}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DoctorAppointment;
