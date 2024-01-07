import { useEffect, useState } from "react";
import MedicineDetails from "./MedicineDetails";
import { axiosInstancePharmaceuticalService } from "../../utils/axiosInstanceHMSApp";
import { useParams } from "react-router-dom";

const MedicineDetailsComponent = () => {
  const { medicineId } = useParams();

  const [medicineDetails, setMedicineDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstancePharmaceuticalService
      .get(`/medicines/${medicineId}`)
      .then((resp) => {
        const data = resp.data;
        console.log("Medicine Data: ", data);
        setMedicineDetails(data);
      })
      .catch((err) => {
        console.error("Error fetching medicine data:", err);
        setError(err);
      });
  }, [medicineId]);

  return (
    <div className="myContainer">
      {error ? (
        <p>Error fetching medicine details</p>
      ) : medicineDetails ? (
        <MedicineDetails medicineDetails={medicineDetails} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default MedicineDetailsComponent;
