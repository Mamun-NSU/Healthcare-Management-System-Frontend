import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Commom/Navbar";
import Footer from "./assets/components/Commom/Footer";
import { ToastContainer } from "react-toastify";

import NotFoundPage from "./assets/components/Pages/Common/NotFoundPage";
import DoctorRegistrationPage from "./assets/components/Pages/Doctor/DoctorRegistrationPage";
import LoginPage from "./assets/components/Pages/Common/LoginPage";
import PatientRegistrationPage from "./assets/components/Pages/Patient/PatientRegistrationPage";
import AddMedicinesPage from "./assets/components/Pages/Inventory/AddMedicinesPage";
import AddEquipmentPage from "./assets/components/Pages/Inventory/AddEquipmentPage";
import DoctorCartsListPage from "./assets/components/Pages/Doctor/DoctorCartsListPage";
import PatientCartsListPage from "./assets/components/Pages/Patient/PatientCartsListPage";
import MedicineCartsListPage from "./assets/components/Pages/Inventory/MedicineCartsListPage";
import EquipmentCartsListPage from "./assets/components/Pages/Inventory/EquipmentCartsListPage";
import EquipmentRoomCartsListPage from "./assets/components/Pages/Inventory/EquipmentRoomCartsListPage";
import Authenticate from "./assets/components/Authenticate/authenticate";
import Doctor from "./assets/components/Authenticate/Doctor";
import Patient from "./assets/components/Authenticate/Patient";
import CreatePatientHealthDataPage from "./assets/components/Pages/Patient/CreatePatientHealthDataPage";
import PatientHealthDetailsPage from "./assets/components/Pages/Patient/PatientHealthDetailsPage";
import PatientDetailsPage from "./assets/components/Pages/Patient/PatientDetailsPage";
import DoctorDetailsPage from "./assets/components/Pages/Doctor/DoctorDetailsPage";
import MedicineDetailsPage from "./assets/components/Pages/Inventory/MedicineDetailsPage";
import UpdatedMedicinePage from "./assets/components/Pages/Inventory/UpdatedMedicinePage";
import UpdatedAppointmentPage from "./assets/components/Pages/Appointment/UpdatedAppointmentPage";
import AddEquipmentRoomPage from "./assets/components/Pages/Inventory/AddEquipmentRoomPage";
import AddDoctorRoomPage from "./assets/components/Pages/Doctor/AddDoctorRoomPage";
import AlertPreferenceCartListPage from "./assets/components/Pages/Notification/AlertPreferenceCartListPage";
import ReviewCartListPage from "./assets/components/Pages/Community/ReviewCartListPage";
import AddReviewPage from "./assets/components/Pages/Community/AddReviewPage";
import PatientReviewPage from "./assets/components/Pages/Community/PatientReviewPage";
import Admin from "./assets/components/Authenticate/Admin";
import AddPostPage from "./assets/components/Pages/Community/AddPostPage";
import PatientPostPage from "./assets/components/Pages/Community/PatientPostPage";
import DoctorAppointmentPage from "./assets/components/Pages/Appointment/DoctorAppointmentPage";
import PatientAppointmentPage from "./assets/components/Pages/Appointment/PatientAppointmentPage";
import DoctorSchedulePage from "./assets/components/Pages/Appointment/DoctorSchedulePage";
import AdminDashboardPage from "./assets/components/Dashboard/AdminDashboard/AdminDashboardPage";
import PatientDashboardPage from "./assets/components/Dashboard/PatientDashboard/PatientDashboardPage";
import DoctorDashboardPage from "./assets/components/Dashboard/DoctorDashboard/DoctorDashboardPage";
import HelpDeskPage from "./assets/components/Pages/HelpDesk/HelpDeskPage";
import DoctorRoomCartsListPage from "./assets/components/Pages/Doctor/DoctorRoomCartsListPage";
import JoinCallPage from "./assets/components/Dashboard/PatientDashboard/joinCallPage";
import CDSSPage from "./assets/components/CDSSService/cdssPage";
import AddSchedulePage from "./assets/components/Pages/Appointment/AddSchedulePage";
import NotificationListPage from "./assets/components/Pages/Notification/NotificationListPage";
import ResearchDataPage from "./assets/components/Research/ResearchDataPage";
import CommunityPage from "./assets/components/Pages/Community/CommunityPage";
import UpdateHomePage from "./assets/components/CommomDashboard/UpdateHomePage";
import AddAppointmentForm from "./assets/components/AppointmentService/AddAppointmentForm";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "100%" }}>
        <Navbar></Navbar>
        {/* <NavBar></NavBar> */}
        <div style={{ minHeight: "50%" }}>
          <Routes>
            <Route path="/" element={<UpdateHomePage />} />
            <Route path="/search" element={<HelpDeskPage />} />

            <Route
              path="/doctorRegistration"
              element={<DoctorRegistrationPage />}
            />
            <Route
              path="/patientRegistration"
              element={<PatientRegistrationPage />}
            />
            <Route path="/doctors" element={<DoctorCartsListPage />} />
            <Route path="/medicines" element={<MedicineCartsListPage />} />
            <Route path="/reviews" element={<ReviewCartListPage />} />
            <Route
              path="/medicines/:medicineId"
              element={<MedicineDetailsPage />}
            />
            <Route element={<Authenticate />}>
              <Route path="/cdssPage" element={<CDSSPage />} />
              <Route path="/patients" element={<PatientCartsListPage />} />
              <Route path="/patientDetails" element={<PatientDetailsPage />} />
              <Route path="/community" element={<CommunityPage />} />

              <Route
                path="/join-call/:roomId"
                element={<JoinCallPage />}
              ></Route>
              {/* <Route
                path="/patientHealthDetails"
                element={<PatientHealthDetailsPage />}
              /> */}

              <Route path="/equipments" element={<EquipmentCartsListPage />} />
            </Route>
            {/* ADMIN NAVBER */}
            <Route element={<Admin />}>
              <Route path="/adminDashboard" element={<AdminDashboardPage />} />
              <Route path="/alerts" element={<AlertPreferenceCartListPage />} />
              <Route path="/addMedicine" element={<AddMedicinesPage />} />
              <Route path="/addEquipment" element={<AddEquipmentPage />} />
              <Route path="/addDoctorRoom" element={<AddDoctorRoomPage />} />
              <Route
                path="/addEquipmentRoom"
                element={<AddEquipmentRoomPage />}
              />
              <Route path="/equipments" element={<EquipmentCartsListPage />} />
              <Route
                path="/doctorRooms"
                element={<DoctorRoomCartsListPage />}
              />
              <Route
                path="/equipmentRooms"
                element={<EquipmentRoomCartsListPage />}
              />
              {/* <Route path="/doctorDetails" element={<DoctorDetailsPage />} /> */}
              <Route
                path="/medicines/update/:medicineId"
                element={<UpdatedMedicinePage />}
              />
              <Route
                path="/updateAppointments"
                element={<UpdatedAppointmentPage />}
              />
              <Route
                path="/notificationList"
                element={<NotificationListPage />}
              />
              <Route path="/researchData" element={<ResearchDataPage />} />
            </Route>

            {/* Doctor navber */}
            <Route element={<Doctor />}>
              <Route path="/addSchedule" element={<AddSchedulePage />} />
              <Route
                path="/doctorDashboard"
                element={<DoctorDashboardPage />}
              />
              <Route
                path="/doctorAppointments"
                element={<DoctorAppointmentPage />}
              />
              <Route path="/reviews" element={<ReviewCartListPage />} />
              <Route
                path="/doctorRooms"
                element={<DoctorRoomCartsListPage />}
              />
              <Route
                path="/equipmentRooms"
                element={<EquipmentRoomCartsListPage />}
              />
              <Route path="/doctorDetails" element={<DoctorDetailsPage />} />
              <Route
                path="/medicines/update/:medicineId"
                element={<UpdatedMedicinePage />}
              />
              <Route
                path="/updateAppointments"
                element={<UpdatedAppointmentPage />}
              />
              <Route path="/patients" element={<PatientCartsListPage />} />
              <Route
                path="/updateAppointments"
                element={<UpdatedAppointmentPage />}
              />
            </Route>

            {/* PATIENT NAVBER */}
            <Route element={<Patient />}>
              <Route
                path="/patientDashboard"
                element={<PatientDashboardPage />}
              />
              <Route
                path="/addAppointment/:patientId"
                element={<AddAppointmentForm />}
              />
              <Route
                path="/doctorSchedule/:doctorId"
                element={<DoctorSchedulePage />}
              />
              <Route
                path="/patientAppointment"
                element={<PatientAppointmentPage />}
              />
              <Route path="/addReview" element={<AddReviewPage />} />
              <Route path="/addPost" element={<AddPostPage />} />

              <Route path="/patientReviews" element={<PatientReviewPage />} />
              <Route path="/patientPosts" element={<PatientPostPage />} />

              <Route
                path="/createPatientHealth"
                element={<CreatePatientHealthDataPage />}
              />
              <Route
                path="/patientHealthDetails"
                element={<PatientHealthDetailsPage />}
              />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer></Footer>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
