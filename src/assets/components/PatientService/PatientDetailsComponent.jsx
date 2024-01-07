import { useEffect, useState } from "react";
import PatientDetails from "./PatientDetails";

import usePatientsHook from "../../hooks/usePatientsHook";

const PatientDetailsComponent = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [error] = useState(null);

  const userId = localStorage.getItem("userId");
  const { patients } = usePatientsHook();

  const currentPatient = patients.find(
    (patient) => patient.patientId === userId
  );

  useEffect(() => {
    if (currentPatient) {
      setPatientDetails(currentPatient);
    }
  }, [currentPatient]);

  return (
    <div className="myContainer">
      <h1 className="text-success">My Details</h1>
      {error ? (
        <p>Error fetching patient details</p>
      ) : patientDetails ? (
        <>
          <PatientDetails patientDetails={patientDetails} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientDetailsComponent;
