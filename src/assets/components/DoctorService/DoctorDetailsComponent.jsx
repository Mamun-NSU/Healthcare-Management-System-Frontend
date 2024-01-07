import { useState, useEffect } from "react";
import DoctorDetails from "./DoctorDetails";

import "../../css/globalStyles.css";
import UpdatedDoctorForm from "./UpdatedDoctorForm";
import { Button } from "react-bootstrap";
import isDoctor from "../Authenticate/isDoctor";
import isAdmin from "../Authenticate/isAdmin";
import useDoctorsHook from "../../hooks/useDoctorsHook";

const DoctorDetailsComponent = () => {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [error] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const userId = localStorage.getItem("userId");
  const { doctors } = useDoctorsHook();

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  const currentDoctor = doctors.find((doctor) => doctor.doctorId === userId);

  useEffect(() => {
    if (currentDoctor) {
      setDoctorDetails(currentDoctor);
    }
  }, [currentDoctor]);

  return (
    <div className="myContainer">
      {error ? (
        <p>Error fetching doctor details</p>
      ) : doctorDetails ? (
        <>
          {isEditMode ? (
            <UpdatedDoctorForm
              doctor={doctorDetails}
              onUpdate={(updatedDoctor) => {
                setDoctorDetails(updatedDoctor);
                exitEditMode();
              }}
            />
          ) : (
            <>
              <DoctorDetails doctorDetails={doctorDetails} />

              {(isDoctor() || isAdmin()) && (
                <Button className="blueButton" onClick={enterEditMode}>
                  Update
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DoctorDetailsComponent;
