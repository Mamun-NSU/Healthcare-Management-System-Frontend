import { useEffect, useState } from "react";
import { axiosInstancePatientService } from "../utils/axiosInstanceHMSApp";


const usePatientsHook = () => {
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstancePatientService
      .get("/patients/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Patient Data: ", data);
        setPatients(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom patient hook");
  };

  return { patients, handleSubmit, errors };
};

export default usePatientsHook;
