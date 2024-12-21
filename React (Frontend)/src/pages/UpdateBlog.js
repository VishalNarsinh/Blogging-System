import React, { useContext, useEffect, useRef, useState } from "react";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getPostById, updateBlog } from "../services/post-service";
import { toast } from "react-toastify";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { Form, FormGroup, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react";
import { loadCategories } from "../services/category-service";

function UpdateBlog() {
  const { pid } = useParams();
  const userContextData = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const editor = useRef(null);
  const [image, setImage] = useState(null);
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
  useEffect(() => {
    loadCategories()
      .then((data) => {
        // console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.error(err);
      });
    getPostById(pid)
      .then((response) => {
        setPost({ ...response, cId: response.category.cid });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  useEffect(() => {
    if (post) {
      if (post.user.id !== userContextData.user.data.id) {
        toast.error("You are not authorized to modify this post");
        navigate("/");
      }
    }
  }, [post]);

  const onChange = (e) => {
    setPost({
      ...post,
      [e.target.id]: e.target.value,
    });
  };

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
    updateBlog(post, image)
      .then((response) => {
        toast.success("Blog updated successfully");
        e.target.reset();
        setPost({ ...response, cId: response.category.cid });
        setImage(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateHtml = () => {
    return (
      <MDBContainer fluid className="">
        <MDBRow>
          <MDBCol sm="8" offsetSm={2}>
            <div className="d-flex flex-row ps-5 pt-4">
              <MDBIcon fas icon="edit fa-3x me-3" color="primary" />
              <span className="h1 fw-bold mb-0">Update your blog</span>
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
                  Update Blog
                </MDBBtn>
              </Form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  return <Base>{post && updateHtml()}</Base>;
}

export default UpdateBlog;
