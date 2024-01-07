import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import DoctorSchedule from "./DoctorSchedule"; // Import DoctorSchedule component
import { axiosInstanceAppointmentService } from "../../utils/axiosInstanceHMSApp";
import { Link, useParams } from "react-router-dom";

const DoctorScheduleList = () => {
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const { doctorId } = useParams();

  // console.log("doctorId is: ", doctorId);
  useEffect(() => {
    const fetchDoctorSchedules = async () => {
      try {
        const response = await axiosInstanceAppointmentService.get(
          `/doctors/schedule/get-by-id/${doctorId}`
        );
        setDoctorSchedules([response.data]);
        console.log("Doctors schedule: ", response.data);
      } catch (error) {
        console.error("Error fetching doctor schedules:", error);
      }
    };

    fetchDoctorSchedules();
  }, [doctorId]);

  return (
    <Container>
      <h1 className="text-success">Doctor Schedules</h1>
      {doctorSchedules.length === 0 ? (
        <h3>No Schedules Available</h3>
      ) : (
        <Row>
          {doctorSchedules.map((schedule) => (
            <Col key={schedule.doctorId} xs={12} md={6} lg={4}>
              {schedule.availableDay !== null ? (
                <DoctorSchedule schedule={schedule} doctorId={doctorId} />
              ) : (
                <>
                  <p>No Schedules Available for this doctor</p>
                  <Link to="/doctors">
                    <Button variant="primary">Back</Button>
                  </Link>
                </>
              )}
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DoctorScheduleList;
