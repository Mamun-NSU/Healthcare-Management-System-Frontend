import { useEffect, useState } from "react";
import { axiosInstanceAppointmentService } from "../utils/axiosInstanceHMSApp";


const useAppointmentsHook = () => {
  const [appointments, setAppointments] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstanceAppointmentService
      .get("/appointments/doctor") 
      .then((resp) => {
        const data = resp.data;
        console.log("Appointment Data: ", data);
        setAppointments(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom appointment hook");
  
  };

  return { appointments, handleSubmit, errors };
};

export default useAppointmentsHook;
