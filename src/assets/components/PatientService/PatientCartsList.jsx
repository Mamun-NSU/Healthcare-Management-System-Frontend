import { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "../../css/globalStyles.css";
import usePatientsHook from "../../hooks/usePatientsHook";
import PatientCart from "./PatientCart";

const PatientCartsList = () => {
  const { patients } = usePatientsHook();
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <Container>
      <h1 className="text-success">Patients List</h1>
      <Row>
        {patients.map((patient, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            {selectedPatient && (
              <Modal
                show={selectedPatient !== null}
                onHide={() => setSelectedPatient(null)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Patient</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>
                  <UpdatedPatientForm doctor={selectedPatient} />
                </Modal.Body> */}
              </Modal>
            )}
            <PatientCart
              patient={patient}
              setSelectedPatient={setSelectedPatient}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PatientCartsList;
