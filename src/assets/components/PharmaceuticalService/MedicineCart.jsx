import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import isDoctor from "../Authenticate/isDoctor";
import isAdmin from "../Authenticate/isAdmin";

const MedicineCart = ({ medicine, handleUpdateClick }) => {
  const isExpired = medicine.expired;

  return (
    <Card
      className="mb-3"
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Card.Body>
        <Card.Title>{medicine.medicineName}</Card.Title>
        <Card.Text className="mb-2">
          <strong>Category:</strong> {medicine.category}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Dosage:</strong> {medicine.dosage}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Manufactured By:</strong> {medicine.manufacturedBy}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Expiration Date:</strong> {medicine.expirationDate}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Quantity:</strong> {medicine.quantity}
        </Card.Text>
        <Card.Text className="mb-2">
          <strong>Side Effects:</strong> {medicine.sideEffects}
        </Card.Text>
        <div
          className={`mt-3 ${
            isExpired ? "text-danger" : "text-success"
          } font-weight-bold`}
        >
          <strong>{isExpired ? "Expired" : "Not Expired"}</strong>
        </div>

        <Link
          to={`/medicines/${medicine.medicineId}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="primary" style={{ marginRight: "10px" }}>
            Details
          </Button>
        </Link>

        {(isDoctor() || isAdmin()) && (
          <>
            <Button
              variant="success"
              onClick={() => handleUpdateClick(medicine)}
            >
              Update
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default MedicineCart;
