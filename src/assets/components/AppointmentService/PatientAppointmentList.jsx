// PatientAppointmentList.jsx
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import PatientAppointment from "./PatientAppointment";
import { axiosInstanceAppointmentService } from "../../utils/axiosInstanceHMSApp";
import { Link } from "react-router-dom";

const PatientAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstanceAppointmentService.get(
          "/appointments/patient"
        );
        const appointmentArray = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setAppointments(appointmentArray);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  if (appointments.length === 0) {
    return (
      <Container>
        <h3>You Have no Appointment...</h3>
        <Link to="/doctors">
          <Button variant="primary">Book an Appointment </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <h1>Your Appointments</h1>
      {appointments.map((appointment) => (
        <PatientAppointment
          key={appointment.appointmentId}
          appointment={appointment}
        />
      ))}
    </Container>
  );
};
export default PatientAppointmentList;
