import { Container, Row, Col } from "react-bootstrap";
import EquipmentRoomCart from "./EquipmentRoomCart"; // Make sure you have EquipmentRoomCart component
import useEquipmentRoomsHook from "../../hooks/useEquipmentRoomsHook"; // Import the useEquipmentRoomsHook

const EquipmentRoomCartsList = () => {
  const { equipmentRooms } = useEquipmentRoomsHook(); // Use the useEquipmentRoomsHook

  return (
    <Container>
      <h1 className="text-success">Equipment Room List</h1>
      <Row>
        {equipmentRooms.map((room, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            <EquipmentRoomCart room={room} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EquipmentRoomCartsList;
