import { Container, Row, Col } from "react-bootstrap";
import useDoctorRoomsHook from "../../hooks/useDoctorRoomsHook";
import DoctorRoomCart from "./DoctorRoomCart";

const DoctorRoomCartsList = () => {
  const { doctorRooms } = useDoctorRoomsHook();

  return (
    <Container>
      <h1 className="text-success">Equipment Room List</h1>
      <Row>
        {doctorRooms.map((room, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            <DoctorRoomCart room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DoctorRoomCartsList;
