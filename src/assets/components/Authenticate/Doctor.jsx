import { Navigate, Outlet } from "react-router-dom";

const Doctor = () => {
  const role = localStorage.getItem("role");

  if (role === "DOCTOR") {
    return <Outlet />;
  } else {
   
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    Navigate("/login");

    return null;
  }
};

export default Doctor;

