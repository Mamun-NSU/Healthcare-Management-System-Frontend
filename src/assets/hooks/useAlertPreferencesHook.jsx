import { useEffect, useState } from "react";
import { axiosInstanceNotificationAlertService } from "../utils/axiosInstanceHMSApp";

const useAlertPreferencesHook = () => {
  const [alerts, setAlerts] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstanceNotificationAlertService
      .get("/alert-preferences/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Alarts Data: ", data);
        setAlerts(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(error);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom doctor room hook");
  };

  return { alerts, handleSubmit, errors };
};

export default useAlertPreferencesHook;
