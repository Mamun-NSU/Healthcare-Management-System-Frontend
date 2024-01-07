import { Navbar, Nav, NavDropdown, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import isDoctor from "../Authenticate/isDoctor";
import isPatient from "../Authenticate/isPatient";
import { Form } from "react-hook-form";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  return (
    <Navbar
      expand="lg"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div className="container">
        <Navbar.Toggle aria-controls="navbarSupport" />

        <Navbar.Collapse id="navbarSupport">
          <Nav className="ml-auto">
            {!token && <Link to="/">Home</Link>}

            {token && (
              <>
                {role === "DOCTOR" && (
                  <NavDropdown title="Doctor" id="doctor-dropdown">
                    {isDoctor() && (
                      <>
                        <NavDropdown.Item
                          as={Link}
                          className="bg-success text-white rounded m-1"
                          to="/doctorDetails"
                        >
                          DoctorDetails
                        </NavDropdown.Item>
                        {/* ... other Doctor links */}
                      </>
                    )}
                  </NavDropdown>
                )}

                {role === "PATIENT" && (
                  <NavDropdown title="Patient" id="patient-dropdown">
                    {isPatient() && (
                      <>
                        <NavDropdown.Item
                          as={Link}
                          className="bg-success text-white rounded m-1"
                          to="/createPatientHealth"
                        >
                          CreatePtHelt
                        </NavDropdown.Item>
                        {/* ... other Patient links */}
                      </>
                    )}
                  </NavDropdown>
                )}

                {role === "ADMIN" && (
                  <NavDropdown
                    title="Admin"
                    id="admin-dropdown"
                    style={{ color: "white", backgroundColor: "blue" }}
                  >
                    {/* Add admin-specific links as NavDropdown.Items */}
                  </NavDropdown>
                )}

                <Form>
                  <div className="input-group input-navbar">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="icon-addon1">
                        <span className="mai-search"></span>
                      </span>
                    </div>
                    <FormControl
                      type="text"
                      placeholder="Enter keyword.."
                      aria-label="Username"
                      aria-describedby="icon-addon1"
                    />
                  </div>
                </Form>

                {userId}

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
                <Link to="/login">Login</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
