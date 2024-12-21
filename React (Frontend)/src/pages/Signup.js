import React, { useEffect, useState } from "react";
import Base from "./../components/Base";
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
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  useEffect(() => {
    console.log(error.errors);
    const isInvalid = !error.errors?.name;
    console.log("Boolean", isInvalid);
  }, [error]);

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
    signUp(user)
      .then((response) => {
        console.log(response);
        resetData();
        setError({ error: {}, isError: false });
        toast.success(
          "Registration successful,\nPlease use registered email address and password to Log in"
        );
      })
      .catch((err) => {
        console.log(e.target);
        console.log(err);

        if (err?.response) {
          setError({
            errors: err.response.data,
            isError: true,
          });
        }
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
                <MDBValidation
                  autoComplete="off"
                  noValidate={true}
                  onSubmit={handleFormSubmission}
                >
                  <MDBValidationItem
                    invalid={!error.errors?.name}
                    feedback={error.errors?.name}
                  >
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Name"
                      id="name"
                      type="text"
                      onChange={handleChange}
                      value={user.name}
                    />
                  </MDBValidationItem>

                  <MDBValidationItem
                    invalid={!error.errors?.email}
                    feedback={error.errors?.email}
                  >
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Email"
                      id="email"
                      type="email"
                      onChange={handleChange}
                      value={user.email}
                    />
                  </MDBValidationItem>

                  <MDBValidationItem
                    invalid={!error.errors?.password}
                    feedback={error.errors?.password}
                  >
                    <MDBInput
                      wrapperClass="mb-5"
                      label="Password"
                      id="password"
                      type="password"
                      onChange={handleChange}
                      value={user.password}
                    />
                  </MDBValidationItem>
                  <MDBValidationItem
                    invalid={!error.errors?.about}
                    feedback={error.errors?.about}
                  >
                    <MDBTextArea
                      wrapperClass="mb-4"
                      label="About yourself"
                      id="about"
                      rows="3"
                      onChange={handleChange}
                      value={user.about}
                    />
                  </MDBValidationItem>

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
                </MDBValidation>
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

export default Signup;
