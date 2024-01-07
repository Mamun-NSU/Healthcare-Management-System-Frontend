const isAdmin = () => {
  const role = localStorage.getItem("role");
  console.log("Role is: ", role);

  if (role === "ADMIN") {
    return true;
  } else {
    return false;
  }
};

export default isAdmin;
