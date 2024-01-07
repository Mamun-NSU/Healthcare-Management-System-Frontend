import { Card } from "react-bootstrap";

const EquipmentRoomCart = ({ room }) => {
  return (
    <Card
      className="my-3"
      style={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        margin: "15px",
      }}
    >
      <Card.Body>
        <Card.Title>
          <strong>Room No:</strong> {room.roomNo}
        </Card.Title>
        <Card.Text>
          <strong>Room Status:</strong> {room.roomStatus}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EquipmentRoomCart;
