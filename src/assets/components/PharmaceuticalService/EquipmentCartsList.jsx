import { Container, Row, Col } from "react-bootstrap";
import EquipmentCart from "./EquipmentCart";
import useEquipmentsHook from "../../hooks/useEquipmentsHook";

const EquipmentCartsList = () => {
  const { equipments } = useEquipmentsHook();

  return (
    <Container>
      <h1 className="text-success">Equipment List</h1>
      <Row>
        {equipments.map((equipment, i) => (
          <Col key={i} lg={4} md={6} sm={12}>
            <EquipmentCart equipment={equipment} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EquipmentCartsList;
