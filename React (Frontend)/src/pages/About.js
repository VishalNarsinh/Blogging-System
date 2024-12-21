import React from "react";
import Base from "../components/Base";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";

function About() {
  document.title = "About - My Blog App";

  return (
    <Base>
      <MDBContainer className="py-5">
        <MDBCard className="shadow-3-strong border-0 mb-4">
          <MDBCardBody className="text-center">
            <MDBCardTitle tag="h1" className="mb-4 fw-bold text-primary">
              About Blog App
            </MDBCardTitle>
            <MDBCardText className="lead">
              Welcome to <strong>Blog App</strong>, a platform where you can
              share your thoughts, ideas, and experiences with the world. This
              project is built with modern web technologies to provide a
              seamless and engaging blogging experience.
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBTypography tag="h3" className="text-center text-secondary mb-3">
          Key Features
        </MDBTypography>
        <MDBListGroup className="mb-4">
          <MDBListGroupItem>
            <MDBIcon fas icon="edit" className="me-3 text-primary" /> Create and
            manage blog posts
          </MDBListGroupItem>
          <MDBListGroupItem>
            <MDBIcon fas icon="comments" className="me-3 text-primary" /> Read
            and engage with posts from other users
          </MDBListGroupItem>

          <MDBListGroupItem>
            <MDBIcon fas icon="lock" className="me-3 text-primary" /> Secure
            user authentication
          </MDBListGroupItem>
        </MDBListGroup>

        <MDBTypography tag="h3" className="text-center text-secondary mb-3">
          Tech Stack
        </MDBTypography>
        <MDBListGroup className="mb-4">
          <MDBListGroupItem>
            <MDBIcon fab icon="react" className="me-3 text-info" />{" "}
            <strong>Frontend:</strong> React.js
          </MDBListGroupItem>
          <MDBListGroupItem>
            <MDBIcon fas icon="cogs" className="me-3 text-info" />{" "}
            <strong>Backend:</strong> Spring Boot
          </MDBListGroupItem>
          <MDBListGroupItem>
            <MDBIcon fas icon="database" className="me-3 text-info" />{" "}
            <strong>Database:</strong> MySQL
          </MDBListGroupItem>
          <MDBListGroupItem>
            <MDBIcon fas icon="shield-alt" className="me-3 text-info" />{" "}
            <strong>Authentication:</strong> JWT-based secure authentication
          </MDBListGroupItem>
        </MDBListGroup>

        <MDBTypography tag="p" className="text-center mt-4">
          This app is designed to offer a robust, scalable, and user-friendly
          blogging experience for everyone.
        </MDBTypography>
      </MDBContainer>
    </Base>
  );
}

export default About;
