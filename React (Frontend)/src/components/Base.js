import React from "react";
import CustomNavbar from "./CustomNavbar";

function Base({ title = "Welcome to Blog-Application", children }) {
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <CustomNavbar />
        {children}
      </div>
    </>
  );
}

export default Base;
