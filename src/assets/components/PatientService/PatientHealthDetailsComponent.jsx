import { useEffect, useState } from "react";
import PatientHealthDetails from "./PatientHealthDetails";
import { axiosInstancePatientService } from "../../utils/axiosInstanceHMSApp";
import UpdatedPatientHealthDataForm from "./UpdatedPatientHealthDataForm";
import "../../css/globalStyles.css";

const PatientHealthDetailsComponent = () => {
  const [healthData, setHealthData] = useState(null);
  const [error, setError] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    axiosInstancePatientService
      .get(`/health/find`)
      .then((resp) => {
        const data = resp.data;
        console.log("Health Data: ", data);
        setHealthData(data);
      })
      .catch((err) => {
        console.error("No Health data available for this patient", err);
        setError(err);
      });
  }, []);

  const handleUpdateClick = () => {
    setIsUpdateMode(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateMode(false);
  };

  const handleHealthDataUpdate = (updatedData) => {
    setHealthData(updatedData);
    setIsUpdateMode(false);
  };

  return (
    <div className="myContainer">
      <h1 className="text-success">My Health Details</h1>
      {error ? (
        <p>Error fetching health data</p>
      ) : healthData ? (
        <>
          {!isUpdateMode ? (
            <>
              <PatientHealthDetails
                healthData={healthData}
                handleUpdateClick={handleUpdateClick}
              />
              <button className="blueButton" onClick={handleUpdateClick}>
                Update Health Data
              </button>
            </>
          ) : (
            <>
              <UpdatedPatientHealthDataForm
                patientHealthData={healthData}
                onUpdate={handleHealthDataUpdate}
              />
              <button className="redButton" onClick={handleUpdateCancel}>
                Cancel Update
              </button>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientHealthDetailsComponent;
