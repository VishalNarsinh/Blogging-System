import {
  MDBBtn,
  MDBCard,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../auth";
import { toast } from "react-toastify";
import { deleteBlog } from "../services/post-service";
import UserContext from "../context/UserContext";

function Blog({ post, updateUi }) {
  const Swal = require("sweetalert2");
  const userContextData = useContext(UserContext);

  const [user, setUser] = useState({});

  useEffect(() => {
    let currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const printDate = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <>
      <MDBCard
        className="px-3 pt-3 my-3"
        style={{
          maxWidth: "32rem",
          maxHeight: "500px",
          // overflow: "hidden",
          // textOverflow: "ellipsis",
        }}
      >
        <div>
          <MDBRipple
            className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-2"
            rippleTag="div"
            rippleColor="light"
          >
            {/* <img
              src={post.image[Object.entries(post.image)[0][0]]}
              className="img-fluid"
              alt=""
              style={
                {
                  // maxHeight: "250px",
                  // maxWidth: "300px",
                }
              }
            /> */}
            <img
              src={post.image[Object.entries(post.image)[0][0]]}
              className="img-fluid"
              alt=""
              style={{
                maxHeight: "150px",
                objectFit: "cover",
                width: "100%",
              }}
            />

            <Link to={"/post/" + post.pid}>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
              ></div>
            </Link>
          </MDBRipple>
          {/* <MDBRow className="mb-2">
            <MDBCol col="6">
              <Link
                to={`/category/${post.category.cid}`}
                className="text-info text-decoration-none"
              >
                <MDBIcon fas icon="project-diagram" className="me-1" />
                {post.category.name}
              </Link>
            </MDBCol>
            <MDBCol col="6" className="text-end">
              <u> {printDate(post.dateAdded)}</u>
            </MDBCol>
          </MDBRow> */}
          <MDBRow
            className="mb-3"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <MDBCol col="6">
              <Link
                to={`/category/${post.category.cid}`}
                className="text-info no-decoration"
              >
                <MDBIcon fas icon="project-diagram" className="me-1" />
                {post.category.name}
              </Link>
            </MDBCol>
            <MDBCol col="6" className="text-end">
              <u>{printDate(post.dateAdded)}</u>
            </MDBCol>
          </MDBRow>

          <Link
            to={"/post/" + post.pid}
            className="text-dark text-decoration-none"
          >
            <h5>{post?.title}</h5>
          </Link>
          <div
            style={{
              maxHeight: "100px",
              overflow: "hidden",
              textOverflow: "",
            }}
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </div>
        {userContextData.user.login && post.user.id === user?.id && (
          <>
            <MDBBtn
              color="danger"
              className="m-1"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You will not be able to recover this blog",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes, delete it!",
                  cancelButtonText: "No, keep it",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteBlog(post.pid).then((response) => {
                      console.log(response);
                      if (response.success) {
                        console.log("Success");
                        // toast.success("Blog deleted successfully");
                        Swal.fire(
                          "Deleted!",
                          "Your Blog has been deleted.",
                          "success"
                        );
                        updateUi(post.pid);
                      }
                    });
                  }
                });

                // deleteBlog(post.pid).then((response) => {
                //   console.log(response);
                //   if (response.success) {
                //     console.log("Success");
                //     toast.success("Blog deleted successfully");
                //     updateUi(post.pid);
                //   }
                // });
              }}
            >
              Delete
            </MDBBtn>
            <MDBBtn
              tag={Link}
              to={"/user/update-blog/" + post.pid}
              color="warning"
              className="m-1"
              onClick={() => {}}
            >
              EDIT BLOG
            </MDBBtn>
          </>
        )}
      </MDBCard>
    </>
  );
}

export default Blog;
