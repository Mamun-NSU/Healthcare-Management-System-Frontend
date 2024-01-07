import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import "../../css/Navbar.css";
import isDoctor from "../Authenticate/isDoctor";
import isPatient from "../Authenticate/isPatient";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  return (
    <div>
      <div
        className="navbar btn-primary bg-success"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {token && (
          <>
            {role === "DOCTOR" && (
              <>
                <NavDropdown title="Doctor" id="doctor-dropdown">
                  {isDoctor() && (
                    <>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/cdssPage"
                      >
                        CDSSReport
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/addSchedule"
                      >
                        AddSchedule
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/doctorAppointments"
                      >
                        Appointments
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/doctorDetails"
                      >
                        DoctorDetails
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/reviews"
                      >
                        Reviews
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/equipments"
                      >
                        Equipments
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/medicines"
                      >
                        Medicines
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patients"
                      >
                        PatientLists
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
                <Link to="/doctorDashboard">Dashboard</Link>
              </>
            )}
            {/* PATIENT NAVBER */}
            {role === "PATIENT" && (
              <>
                <NavDropdown title="Patient" id="patient-dropdown">
                  {isPatient() && (
                    <>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patientAppointment"
                      >
                        MyAppointment
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/createPatientHealth"
                      >
                        CreateHealthDetails
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patientHealthDetails"
                      >
                        HealthDetails
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patientDetails"
                      >
                        MyDetails
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/addReview"
                      >
                        AddReview
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/addPost"
                      >
                        AddPost
                      </NavDropdown.Item>

                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patientReviews"
                      >
                        MyReview
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/patientPosts"
                      >
                        MyPosts
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        className="bg-success text-white rounded m-1"
                        to="/doctors"
                      >
                        DoctorList
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
                <Link to="/patientDashboard">Dashboard</Link>
              </>
            )}
            {/* ADMIN NAVBER */}
            {role === "ADMIN" && (
              <>
                <NavDropdown title="Admin" id="admin-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/cdssPage"
                  >
                    CDSSReport
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/ResearchData"
                  >
                    ResearchData
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/reviews"
                  >
                    Reviews
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/addMedicine"
                  >
                    AddMedicine
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/addEquipment"
                  >
                    AddEquipment
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/addEquipmentRoom"
                  >
                    AddEquipmentRoom
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/addDoctorRoom"
                  >
                    AddDoctorRoom
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/reviews"
                  >
                    Reviews
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/equipments"
                  >
                    Equipments
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/medicines"
                  >
                    Medicines
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/equipmentRooms"
                  >
                    EquipmentRooms
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/doctorRooms"
                  >
                    DoctorRooms
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/patients"
                  >
                    PatientLists
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    className="bg-success text-white rounded m-1"
                    to="/notificationList"
                  >
                    NotificationList
                  </NavDropdown.Item>
                </NavDropdown>
                <Link to="/adminDashboard">Dashboard</Link>
              </>
            )}
            <Link to="/">Home</Link>
            <Link to="/community">Community</Link>
            <Link to="/search">Search</Link>
            {/* {userId} */}
            {role === "PATIENT" && <Link to="/patientDashboard">PATIENT</Link>}
            {role === "ADMIN" && <Link to="/adminDashboard">ADMIN</Link>}
            {role === "DOCTOR" && <Link to="/doctorDashboard">DOCTOR</Link>}
            <button
              className="btn bg-success text-white"
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("role");
                localStorage.removeItem("token");

                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
