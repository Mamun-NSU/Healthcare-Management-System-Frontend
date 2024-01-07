import { useEffect, useState } from "react";
import { axiosInstancePharmaceuticalService } from "../utils/axiosInstanceHMSApp";


const useMedicinesHook = () => {
  const [medicines, setMedicines] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstancePharmaceuticalService
      .get("/medicines/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Medicine Data: ", data);
        setMedicines(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom medicine hook");
  };

  return { medicines, handleSubmit, errors };
};

export default useMedicinesHook;
