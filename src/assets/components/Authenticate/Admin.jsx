import { Navigate, Outlet } from "react-router-dom";

const Admin = () => {
  const role = localStorage.getItem("role");
  
  if (role === "ADMIN") {
    return <Outlet />;
  } else {
   
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    Navigate("/login");

    return null;
  }
};

export default Admin;


