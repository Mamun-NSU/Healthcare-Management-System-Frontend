import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../../css/card.css";
import isDoctor from "../Authenticate/isDoctor";
import { Link } from "react-router-dom";
import isPatient from "../Authenticate/isPatient";
import DoctorScheduleList from "../AppointmentService/DoctorScheduleList";

const DoctorCart = ({ doctor, setSelectedDoctor }) => {
  const [showDoctorSchedule, setShowDoctorSchedule] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleDoctorScheduleClick = () => {
    setShowDoctorSchedule(true);
  };

  return (
    <Card
      className="doctor-card mb-3"
      style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
    >
      {doctor.doctorImage && (
        <Card.Img
          className="doctor-card-image"
          variant="top"
          src={doctor.doctorImage}
          alt={`${doctor.dfirstName} ${doctor.dlastName}`}
          style={{ width: "200px", height: "200px" }} // Adjust the width and height as needed
        />
      )}
      <Card.Body>
        <Card.Title>{`${doctor.dfirstName} ${doctor.dlastName}`}</Card.Title>
        <Card.Text>Doctor ID: {doctor.doctorId}</Card.Text>
        <Card.Text>Gender: {doctor.dgender}</Card.Text>
        <Card.Text>Specialities: {doctor.specialities.join(", ")}</Card.Text>
        <Card.Text>
          Qualifications: {doctor.qualifications.join(", ")}
        </Card.Text>
        <Card.Text>
          Room: {doctor.room ? `Room ${doctor.room.roomNo}` : "Not Assigned"}
        </Card.Text>

        {isDoctor() && userId === doctor.doctorId && (
          <Button variant="primary" onClick={() => setSelectedDoctor(doctor)}>
            Update
          </Button>
        )}

        {isPatient() && (
          <>
            <Link to={`/doctorSchedule/${doctor.doctorId}`}>
              <Button
                className="blueButton"
                onClick={handleDoctorScheduleClick}
              >
                Doctor Schedule
              </Button>
            </Link>
            {showDoctorSchedule && <DoctorScheduleList />}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default DoctorCart;
