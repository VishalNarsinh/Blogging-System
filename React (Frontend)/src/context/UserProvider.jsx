import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { getCurrentUser, isLoggedIn } from "../auth";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      data: getCurrentUser(),
      login: isLoggedIn(),
    });
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
