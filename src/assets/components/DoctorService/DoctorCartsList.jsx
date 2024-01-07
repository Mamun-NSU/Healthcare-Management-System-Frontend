import { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "../../css/globalStyles.css";
import DoctorCart from "./DoctorCart";
import useDoctorsHook from "../../hooks/useDoctorsHook";
import UpdatedDoctorForm from "./UpdatedDoctorForm";
import { Link } from "react-router-dom";

const DoctorCartsList = () => {
  const { doctors } = useDoctorsHook();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const token = localStorage.getItem("token");

  return (
    <Container>
      <h1 className="text-success">Doctor List</h1>
      <Row>
        {!token && (
          <>
            <h5 className="text-info">For Appointment, Please login... </h5>
            <Link to="/login">
              <Button variant="success">LogIn</Button>
            </Link>
          </>
        )}
        {doctors.map((doctor, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            {selectedDoctor && (
              <Modal
                show={selectedDoctor !== null}
                onHide={() => setSelectedDoctor(null)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UpdatedDoctorForm doctor={selectedDoctor} />
                </Modal.Body>
              </Modal>
            )}
            <DoctorCart doctor={doctor} setSelectedDoctor={setSelectedDoctor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorCartsList;
