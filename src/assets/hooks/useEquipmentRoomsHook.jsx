import { useEffect, useState } from "react";
import { axiosInstancePharmaceuticalService } from "../utils/axiosInstanceHMSApp";


const useEquipmentRoomsHook = () => {
  const [equipmentRooms, setEquipmentRooms] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstancePharmaceuticalService
      .get("/equipment-rooms/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Equipment Room Data: ", data);
        setEquipmentRooms(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom equipment room hook");
  };

  return { equipmentRooms, handleSubmit, errors };
};

export default useEquipmentRoomsHook;
