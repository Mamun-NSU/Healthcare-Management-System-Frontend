import { useEffect, useState } from "react";
import { axiosInstancePharmaceuticalService } from "../utils/axiosInstanceHMSApp";


const useEquipmentsHook = () => {
  const [equipments, setEquipments] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstancePharmaceuticalService
      .get("/equipment/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Equipment Data: ", data);
        setEquipments(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom equipment hook");
  };

  return { equipments, handleSubmit, errors };
};

export default useEquipmentsHook;
