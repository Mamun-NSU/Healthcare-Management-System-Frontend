import { useEffect, useState } from "react";
import { axiosInstanceDoctorService } from "../utils/axiosInstanceHMSApp";
// import axiosInstance from "../utils/axiosInstance";

const useDoctorsHook = () => {
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstanceDoctorService
      .get("/doctors/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Doctor Data: ", data);
        setDoctors(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom doctor hook");
  };

  return { doctors, handleSubmit, errors };
};

export default useDoctorsHook;
