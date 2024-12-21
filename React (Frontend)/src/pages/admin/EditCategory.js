import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import {
  addCategory,
  getCategoryById,
  updateCategory,
} from "../../services/category-service";
import Base from "../../components/Base";
import { useParams } from "react-router-dom";

function EditCategory() {
  const { cid } = useParams();
  const [category, setCategory] = useState();
  useEffect(() => {
    getCategoryById(cid)
      .then((response) => {
        setCategory(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(category);
  }, [category]);
  const onChange = (e) => {
    setCategory({ ...category, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!category.name.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!category.description.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    updateCategory(category)
      .then((response) => {
        console.log(response);
        toast.success("Category updated successfully");
        e.target.reset();
        setCategory(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // addCategory(category)
    //   .then((response) => {
    //     e.target.reset();
    //     setCategory({
    //       name: "",
    //       description: "",
    //     });
    //     toast.success("Category added successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.success("Something went wrong");
    //   });
  };

  return (
    <Base>
      <MDBContainer
        fluid
        className="vh-100 d-flex align-items-center justify-content-center bg-image"
        style={{
          backgroundImage:
            "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
        }}
      >
        <div className="mask gradient-custom-3"></div>
        {category && (
          <MDBCard className="m-5">
            <MDBCardBody className="px-5">
              <h2 className="text-uppercase text-center mb-5">Edit Category</h2>
              <form onSubmit={onSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  id="name"
                  label="Category Name"
                  size="lg"
                  type="text"
                  onChange={onChange}
                  value={category.name}
                />

                <MDBTextArea
                  label="Category Description"
                  id="description"
                  rows={5}
                  style={{
                    width: "",
                  }}
                  wrapperClass="mb-4"
                  size="lg"
                  onChange={onChange}
                  value={category.description}
                />

                <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
                  Save changes
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        )}
      </MDBContainer>
    </Base>
  );
}

export default EditCategory;
