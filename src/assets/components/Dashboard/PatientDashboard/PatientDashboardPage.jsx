import FindNotifications from "./FindNotifications";

import PatientDashboardComponents from "./PatientDashboardComponents";

const PatientDashboardPage = () => {
  return (
    <div>
      <FindNotifications />
      <PatientDashboardComponents />
      {/* <AppointmentAdd /> */}
      <patientProfilePage />
    </div>
  );
};

export default PatientDashboardPage;
