import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBTextArea,
  MDBRow,
  MDBCol,
  MDBCardText,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import {
  addCategory,
  deleteCategory,
  loadCategories,
} from "../../services/category-service";
import Base from "../../components/Base";
import { Link } from "react-router-dom";

function ShowCategory() {
  const Swal = require("sweetalert2");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((err) => {
        toast.error("Error loading categories");
      });
  }, []);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <Base>
      <MDBContainer
        fluid
        className=" vh-100 bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        {categories.length <= 0 ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <h1 className="display-1 fw-bolder bg-primary text-danger rounded">
              No Categories exists
            </h1>
          </div>
        ) : (
          ""
        )}
        <div className="mask gradient-custom-3"></div>
        <MDBRow>
          {categories.length > 0 &&
            categories.map((category) => (
              <MDBCol sm="12" md="6" lg="4">
                <MDBCard className="m-5">
                  <MDBCardBody className="px-5">
                    <h1>{category.name}</h1>
                    <MDBCardText>{category.description}</MDBCardText>
                    <div className="text-center">
                      <MDBBtn
                        tag={Link}
                        to={"/admin/edit-category/" + category.cid}
                        color="warning"
                        className="m-1"
                      >
                        EDIT
                      </MDBBtn>
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
                              deleteCategory(category.cid)
                                .then((response) => {
                                  if (response.success) {
                                    setCategories(
                                      categories.filter(
                                        (c) => c.cid !== category.cid
                                      )
                                    );
                                    console.log("Success");
                                    Swal.fire(
                                      "Deleted!",
                                      "Category has been deleted.",
                                      "success"
                                    );
                                  }
                                })
                                .catch((error) => {
                                  console.log(error);
                                });
                            }
                          });
                        }}
                      >
                        DELETE
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    </Base>
  );
}

export default ShowCategory;
