import React, { useContext, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Base from "../components/Base";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import UserContext from "../context/UserContext";

function Login() {
  const userContextData = useContext(UserContext);

  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setLoginDetail({ ...loginDetail, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loginDetail.email) {
      toast.error("Please enter your email address");
    }
    if (!loginDetail.password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    loginUser(loginDetail)
      .then((response) => {
        // save to local storage
        doLogin(response, () => {
          userContextData.setUser({
            data: response.user,
            login: true,
          });

          navigate("/user/my-blogs");
        });

        toast.success("Login successful");
      })
      .catch((error) => {
        console.log(error);
        if (
          error?.response?.status === 400 ||
          error?.response?.status === 404
        ) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("Something went wrong on the server");
        }
      });
  };

  const resetLoginDetail = () => {
    setLoginDetail({
      email: "",
      password: "",
    });
  };

  return (
    <Base>
      <MDBContainer fluid className="mt-5">
        <MDBRow>
          <MDBCol md="6">
            <div className="d-flex flex-row ps-5 pt-5">
              <MDBIcon
                fab
                icon="blogger fa-3x me-3"
                color="primary"
                // style={{ color: "#709085" }}
              />
              <span className="h1 fw-bold mb-0">Blog-App</span>
            </div>

            <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
              <h3
                className="fw-normal mb-3 ps-5 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Log in
              </h3>
              <Form autoComplete="off" onSubmit={onSubmit} noValidate={true}>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Email address"
                  id="email"
                  type="email"
                  size="lg"
                  value={loginDetail.email}
                  onChange={onChange}
                />
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Password"
                  id="password"
                  type="password"
                  size="lg"
                  value={loginDetail.password}
                  onChange={onChange}
                />

                <MDBBtn
                  className="mb-4 px-5 mx-5 w-100"
                  color="primary"
                  size="lg"
                >
                  Login
                </MDBBtn>
              </Form>
              <p className="small mb-5 pb-lg-3 ms-5">
                <a className="text-muted" href="#!">
                  Forgot password?
                </a>
              </p>
              <p className="ms-5">
                Don't have an account?
                <NavLink to="/signup" className="link-info ms-2">
                  Register here
                </NavLink>
              </p>
            </div>
          </MDBCol>

          <MDBCol md="6" className="d-none d-md-block px-0">
            <img
              src="https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login"
              style={{ maxWidth: "95%", marginTop: "5%" }}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
}

export default Login;
