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
import { addCategory } from "../../services/category-service";
import Base from "../../components/Base";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {}, []);
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
      toast.error("Description cannot be empty");
      return;
    }
    addCategory(category)
      .then((response) => {
        e.target.reset();
        setCategory({
          name: "",
          description: "",
        });
        toast.success("Category added successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
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
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Add Category</h2>
            <form autoComplete="off" onSubmit={onSubmit}>
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
                rows={4}
                wrapperClass="mb-4"
                size="lg"
                onChange={onChange}
                value={category.description}
              />

              <MDBBtn className="mb-4 w-100 gradient-custom-4" size="lg">
                Add Category
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </Base>
  );
}

export default AddCategory;
