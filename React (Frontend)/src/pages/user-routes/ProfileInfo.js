import React, { useContext, useEffect, useState } from "react";
import { doLogin, doLogout, getCurrentUser, getTokens } from "../../auth";
import Base from "../../components/Base";
import UserContext from "../../context/UserContext";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBInput,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import { deleteUser, updateUser } from "../../services/user-service";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function ProfileInfo() {
  const Swal = require("sweetalert2");
  const navigate = useNavigate();
  const userContextData = useContext(UserContext);
  console.log(userContextData);
  const [user, setUser] = useState(getCurrentUser());
  const [image, setImage] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  useEffect(() => {
    setUser(getCurrentUser());
  }, [userContextData]);
  // useEffect(() => {}, [showDetails]);

  const showUserDetails = () => {
    return (
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={user?.image?.imageUrl}
                      alt="Generic placeholder image"
                      className="mt-4 mb-2 img-thumbnail"
                      fluid
                      style={{ width: "150px", zIndex: "1" }}
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                    <MDBTypography tag="h5">{user.email}</MDBTypography>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                ></div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div
                      className="p-4"
                      style={{
                        backgroundColor: "#f8f9fa",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <MDBCardText className="font-italic mb-1">
                        {user?.about}
                      </MDBCardText>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <MDBBtn
                        outline
                        color="dark"
                        style={{ height: "36px", overflow: "visible" }}
                        onClick={() => {
                          setShowDetails(false);
                        }}
                      >
                        Edit profile
                      </MDBBtn>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(user, image)
      .then((response) => {
        e.target.reset();
        console.log(response);
        let data = getTokens();
        let newData = {
          ...data,
          user: response,
        };
        doLogin(newData, () => {
          userContextData.setUser({
            data: response,
            login: true,
          });
          toast.success("User updated successfully");
        });
        // setUser(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    if (!userContextData.user.login) {
      toast.error("Please login");
      return;
    }
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.includes("image")) {
      setImage(selectedFile);
    } else {
      toast.error("Please select a valid image file.");
      // You can also reset the input field to clear the invalid selection
      e.target.value = "";
    }
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser()
          .then(() => {
            toast.success("Account deleted successfully!");
            doLogout(() => {
              userContextData.setUser({
                data: {},
                login: false,
              });
              navigate("/");
            });
            userContextData.setUser({ data: {}, login: false });
          })
          .catch((err) => {
            console.error("Error deleting account:", err);
            toast.error("Failed to delete the account. Please try again.");
          });
      }
    });
  };

  const editProfile = () => {
    return (
      <div className="gradient-custom-2" style={{ backgroundColor: "#9de2ff" }}>
        {/* {JSON.stringify(user)} */}
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <MDBCardBody className="text-black p-4">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <MDBInput
                        wrapperClass="mb-3"
                        label="Name"
                        id="name"
                        type="text"
                        onChange={handleChange}
                        value={user.name}
                      />

                      <MDBInput
                        wrapperClass="mb-3"
                        label="Email"
                        id="email"
                        type="email"
                        onChange={handleChange}
                        value={user.email}
                      />
                      <MDBFile
                        onChange={handleImageChange}
                        className="mb-3"
                        label="Choose new Profile photo"
                        id="image"
                      />
                    </div>
                    <div className="mb-1">
                      <div
                        className="p-4"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <MDBTextArea
                          wrapperClass="mb-4"
                          label="About yourself"
                          id="about"
                          rows="3"
                          onChange={handleChange}
                          value={user.about}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <MDBBtn
                          type="submit"
                          outline
                          color="dark"
                          style={{ height: "auto", overflow: "visible" }}
                        >
                          Save Changes
                        </MDBBtn>
                      </div>
                      <div className="col-3 offset-md-2">
                        <MDBBtn
                          color="primary"
                          onClick={() => {
                            setShowDetails(true);
                          }}
                        >
                          Show Details
                        </MDBBtn>
                      </div>
                      <div className="col-12 mt-3">
                        <MDBBtn
                          color="danger"
                          type="button"
                          onClick={handleDelete}
                        >
                          Delete Account
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  };

  return (
    <Base>
      {userContextData.user.login && showDetails && showUserDetails()}
      {userContextData.user.login && !showDetails && editProfile()}
    </Base>
  );
}

export default ProfileInfo;
