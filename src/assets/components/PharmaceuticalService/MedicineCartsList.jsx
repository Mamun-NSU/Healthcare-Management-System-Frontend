import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import useMedicinesHook from "../../hooks/useMedicinesHook";
import MedicineCart from "./MedicineCart";
import { useState } from "react";
import UpdatedMedicineForm from "./UpdatedMedicineForm";
import { Link } from "react-router-dom";

const MedicineCartsList = () => {
  const { medicines } = useMedicinesHook();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const token = localStorage.getItem("token");

  const handleUpdateClick = (medicine) => {
    setSelectedMedicine(medicine);
  };

  return (
    <Container>
      <h1 className="text-success">Medicine List</h1>
      <Row>
        {!token && (
          <>
            <h5 className="text-info">For purchase, please login... </h5>
            <Link to="/login">
              <Button variant="success">LogIn</Button>
            </Link>
          </>
        )}
        {medicines.map((medicine, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            {selectedMedicine && (
              <Modal
                show={selectedMedicine !== null}
                onHide={() => setSelectedMedicine(null)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Update Medicine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UpdatedMedicineForm medicine={selectedMedicine} />
                </Modal.Body>
              </Modal>
            )}
            <MedicineCart
              medicine={medicine}
              handleUpdateClick={handleUpdateClick}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MedicineCartsList;
