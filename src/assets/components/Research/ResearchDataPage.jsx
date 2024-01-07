import DoctorsListTable from "./DoctorsListTable";
import MedicineListTable from "./MedicineListTable";
import PatientListTable from "./PatientListTable";

const ResearchDataPage = () => {
  return (
    <div>
      <DoctorsListTable />
      <PatientListTable />
      <MedicineListTable />
    </div>
  );
};
export default ResearchDataPage;
