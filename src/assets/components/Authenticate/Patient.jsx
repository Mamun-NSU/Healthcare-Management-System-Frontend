import { Navigate, Outlet } from "react-router-dom";

const Patient = () => {
  const role = localStorage.getItem("role");

  if (role === "PATIENT") {
    return <Outlet />;
  } else {
   
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    Navigate("/login");

    return null;
  }
};

export default Patient;

