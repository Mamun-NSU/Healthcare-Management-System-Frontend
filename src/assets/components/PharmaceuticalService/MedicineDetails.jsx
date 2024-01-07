import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MedicineDetails = ({ medicineDetails }) => {
  const {
    medicineId,
    medicineName,
    category,
    dosage,
    manufacturedBy,
    expirationDate,
    quantity,
    sideEffects,
  } = medicineDetails;

  return (
    <div className="p-4" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 className="mb-4 text-success">Medicine Information</h2>
      <p>
        <strong>Medicine ID:</strong> {medicineId}
      </p>
      <p>
        <strong>Medicine Name:</strong> {medicineName}
      </p>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Dosage:</strong> {dosage} mg
      </p>
      <p>
        <strong>Manufactured By:</strong> {manufacturedBy}
      </p>
      <p>
        <strong>Expiration Date:</strong> {expirationDate}
      </p>
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>
      <p>
        <strong>Side Effects:</strong> {sideEffects}
      </p>
      <Link to="/medicines">
        <Button variant="primary">Back</Button>
      </Link>
    </div>
  );
};

export default MedicineDetails;
