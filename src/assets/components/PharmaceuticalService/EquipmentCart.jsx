import { Card } from "react-bootstrap";

const EquipmentCart = ({ equipment }) => {
  return (
    <Card
      className="mb-3"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Card.Body>
        <Card.Title>{equipment.name}</Card.Title>
        <Card.Text>
          <strong>Description:</strong> {equipment.description}
        </Card.Text>
        <Card.Text>
          <strong>Manufacturer:</strong> {equipment.manufacturer}
        </Card.Text>
        <Card.Text>
          <strong>Room No:</strong> {equipment.equipmentRoom.roomNo}
        </Card.Text>
        <Card.Text>
          <strong>Expired Status:</strong> {equipment.expired}
        </Card.Text>
        <Card.Text>
          <strong>Purchase Date:</strong> {equipment.purchaseDate}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EquipmentCart;
