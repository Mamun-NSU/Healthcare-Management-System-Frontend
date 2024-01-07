import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { axiosInstanceAppointmentService } from "../../utils/axiosInstanceHMSApp";
import DoctorAppointment from "./DoctorAppointment";

const DoctorAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstanceAppointmentService.get(
          `/appointments/doctor/${userId}`
        );
        setAppointments(response.data);
        console.log("Appointments data:", response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [userId]);

  // Function to chunk the appointments array into groups of 3
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedAppointments = chunkArray(appointments, 3);

  return (
    <div>
      <h1 className="mb-4 text-success">My Appointments</h1>

      {chunkedAppointments.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((appointment, colIndex) => (
            <Col key={colIndex} lg={4} md={6} sm={12}>
              <DoctorAppointment
                key={appointment.appointmentId}
                appointment={appointment}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

export default DoctorAppointmentList;
