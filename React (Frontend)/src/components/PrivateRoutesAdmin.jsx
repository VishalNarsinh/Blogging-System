import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";
import UserContext from "../context/UserContext";

const PrivateRoutesAdmin = () => {
  const userContextData = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(
      userContextData?.user?.data?.roles?.find(
        (role) => role.name === "ROLE_ADMIN"
      ) !== undefined
    );
  }, [userContextData]);
  return isAdmin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutesAdmin;
