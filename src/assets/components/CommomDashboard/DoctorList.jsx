import { Col, Container, Row } from "react-bootstrap";

import DoctorCart from "../DoctorService/DoctorCart";
import useDoctorsHook from "../../hooks/useDoctorsHook";

const DoctorList = () => {
  const { doctors } = useDoctorsHook();

  const selectedDoctors = doctors.slice(0, 3);

  return (
    <Container>
      <h1 className="text-success">Doctor List</h1>
      <Row>
        {selectedDoctors.map((doctor, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            <DoctorCart doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorList;
