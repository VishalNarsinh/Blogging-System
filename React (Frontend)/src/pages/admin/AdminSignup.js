import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
  MDBTextArea,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../../components/Base";
import { signUpAdmin } from "../../services/user-service";

function AdminSignup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const resetData = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      about: "",
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    signUpAdmin(user)
      .then((response) => {
        console.log(response);
        resetData();
        toast.success(
          "Admin Registration successful,\nPlease use registered email address and password to Log in"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Base>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Welcome to
              <MDBIcon fab icon="blogger mx-2" color="primary" />
              Blog-App
              <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                Exploring Ideas & Insights
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Explore the latest insights, ideas, and perspectives on various
              topics. Whether it's technology, lifestyle, travel, or more, we've
              got you covered. Join us on a journey of discovery and
              inspiration.
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <form
                  autoComplete="off"
                  noValidate={true}
                  onSubmit={handleFormSubmission}
                >
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    id="name"
                    type="text"
                    onChange={handleChange}
                    value={user.name}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleChange}
                    value={user.email}
                  />

                  <MDBInput
                    wrapperClass="mb-5"
                    label="Password"
                    id="password"
                    type="password"
                    onChange={handleChange}
                    value={user.password}
                  />
                  <MDBTextArea
                    wrapperClass="mb-4"
                    label="About yourself"
                    id="about"
                    rows="3"
                    onChange={handleChange}
                    value={user.about}
                  />

                  <MDBRow>
                    <MDBCol md={6}>
                      <MDBBtn className="w-100 mb-4" size="md">
                        sign up
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md={6}>
                      <MDBBtn
                        type="button"
                        className="w-100 mb-4"
                        size="md"
                        onClick={resetData}
                      >
                        clear
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
                <p className="d-flex justify-content-center">
                  Already have an account?
                  <NavLink to="/login" className="link-info ms-2">
                    Login here
                  </NavLink>
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
}

export default AdminSignup;
