import React, { useContext, useEffect, useRef, useState } from "react";
import Base from "./Base";
import { loadCategories } from "./../services/category-service";
import { createPost as postPublisher } from "./../services/post-service";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBSpinner,
  MDBTextArea,
} from "mdb-react-ui-kit";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  NavLink,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { getCurrentUser, isLoggedIn } from "../auth";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddComponent = () => {
  const userContextData = useContext(UserContext);
  const [post, setPost] = useState({
    title: "",
    content: "",
    cId: 0,
  });

  const clearPostData = () => {
    setPost({
      title: "",
      content: "",
      cId: 0,
    });
    setImage(null);
  };
  const [image, setImage] = useState(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!post.title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!post.content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    if (post.cId === 0) {
      toast.error("Please select a category");
      return;
    }
    setLoading(true);

    postPublisher(post, image)
      .then((data) => {
        toast.success("Blog posted successfully");
        clearPostData();
        e.target.reset();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
        setLoading(false);
      });
  };
  const onChange = (e) => {
    if (!userContextData.user.login) {
      toast.error("Please login");
      return;
    }
    setPost({ ...post, [e.target.id]: e.target.value });
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
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.live) {
      toast.error("You can't post");
      navigate("/");
    }
    loadCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Base>
      <MDBContainer fluid className="">
        <MDBRow>
          <MDBCol sm="8" offsetSm={2}>
            <div className="d-flex flex-row ps-5 pt-4">
              <MDBIcon fas icon="edit fa-3x me-3" color="primary" />
              <span className="h1 fw-bold mb-0">What's on your mind???</span>
            </div>

            <div className="d-flex flex-column justify-content-center h-custom-2 w-100">
              <Form autoComplete="off" onSubmit={onSubmit} noValidate={true}>
                <FormGroup className="mb-4 mx-5 w-100">
                  <Label for="cId">Select Category</Label>
                  <Input
                    id="cId"
                    name="select"
                    type="select"
                    onChange={onChange}
                    value={post.cId}
                  >
                    <option disabled value="0">
                      --Select Category--
                    </option>
                    {categories.map((category) => (
                      <option key={category.cid} value={category.cid}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Enter Title"
                  id="title"
                  type="text"
                  size="lg"
                  onChange={onChange}
                  value={post.title}
                />

                <FormGroup className="mb-4 mx-5 w-100">
                  <label htmlFor="content" className="mb-2">
                    Enter content here
                  </label>
                  <JoditEditor
                    id="content"
                    ref={editor}
                    value={post.content}
                    onChange={(newContent) => {
                      setContent(newContent);
                      setPost({ ...post, content: newContent });
                    }}
                  />
                </FormGroup>
                <Label className="mb-1 mx-5 w-100" for="exampleFile">
                  File
                </Label>
                <Input
                  onChange={handleImageChange}
                  className="mb-4 mx-5 w-100"
                  id="image"
                  name="file"
                  type="file"
                />

                <MDBBtn
                  type="submit"
                  className="mb-4 px-5 mx-5 w-100"
                  color="primary"
                  size="lg"
                >
                  {loading ? (
                    <MDBSpinner size="sm" role="status" tag="span" />
                  ) : (
                    "Post"
                  )}
                </MDBBtn>
              </Form>
            </div>
          </MDBCol>

          {/* <MDBCol md="6" className="d-none d-md-block px-0">
            <img
              src="https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login"
              style={{ maxWidth: "95%", marginTop: "5%" }}
            />
          </MDBCol> */}
        </MDBRow>
      </MDBContainer>
    </Base>
  );
};

export default AddComponent;
