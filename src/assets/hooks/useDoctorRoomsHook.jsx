import { useEffect, useState } from "react";
import { axiosInstanceDoctorService } from "../utils/axiosInstanceHMSApp";



const useDoctorRoomsHook = () => {
  const [doctorRooms, setDoctorRooms] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstanceDoctorService
      .get("/doctor-rooms/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Doctor Room Data: ", data);
        setDoctorRooms(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom doctor room hook");
  };

  return { doctorRooms, handleSubmit, errors };
};

export default useDoctorRoomsHook;
