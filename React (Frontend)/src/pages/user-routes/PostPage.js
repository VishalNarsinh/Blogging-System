import React, { useContext, useEffect, useState } from "react";
import Base from "./../../components/Base";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { getPostById } from "../../services/post-service";
import { getCurrentUser, isLoggedIn } from "../../auth";
import { creatComment, deleteComment } from "../../services/commet-service";
import { Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import UserContext from "./../../context/UserContext";

const PostPage = () => {
  const userContextData = useContext(UserContext);

  const { pid } = useParams();

  const [post, setPost] = useState({});

  const [user, setUser] = useState(getCurrentUser());

  const [commentContent, setCommentContent] = useState("");

  const onChange = (e) => {
    if (!isLoggedIn()) {
      toast.error("Please login");
      return;
    }
    setCommentContent(e.target.value);
  };
  // console.log(user);

  useEffect(() => {
    getPostById(pid)
      .then((post) => {
        console.log(post);
        setPost(post);
        console.log();
      })
      .catch((error) => {
        toast.error("No such post exists");
        navigate("/");
        console.log(error);
      });
  }, []);

  const printDate = (date) => {
    return new Date(date).toDateString();
  };
  const navigate = useNavigate();
  return (
    <Base>
      <MDBContainer>
        <Link
          style={{ fontSize: "26px", textDecoration: "none" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Home
        </Link>
        <span style={{ fontSize: "26px", textDecoration: "none" }}>/</span>
        <Link style={{ fontSize: "26px", textDecoration: "none" }}>
          {post.title}
        </Link>
        <MDBRow>
          <MDBCol size={12}>
            {post.content && (
              <MDBCard className="p-2">
                <div className="d-flex align-items-center  ms-3 my-3">
                  <div className="d-flex align-items-center me-auto ms-3 my-3">
                    <a href="#!">
                      <img
                        src={post?.user?.image?.imageUrl}
                        className="border rounded-circle me-2"
                        alt="Avatar"
                        style={{ height: "40px" }}
                      />
                    </a>
                    <div>
                      <a
                        style={{ textDecoration: "none" }}
                        href="#!"
                        className="text-dark mb-0"
                      >
                        <strong>{post?.user?.name}</strong>
                      </a>
                      <br />
                      <small>{printDate(post.dateAdded)}</small>
                    </div>
                  </div>

                  <div className="d-flex align-items-center me-5 ">
                    <h5>Category : {post.category.name}</h5>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    width: "100%",
                    height: "2px",
                    background: "#e2e2e2",
                  }}
                ></div>
                <div className="p-2 m-2">
                  <span className="display-6">{post?.title}</span>
                </div>

                <div
                  className="d-flex justify-content-center align-items-center mt-2"
                  style={{
                    maxWidth: "50%",
                    maxHeight: "50%",
                  }}
                >
                  <img
                    src={post?.image[Object.entries(post?.image)[0][0]]}
                    alt=""
                    className="img-fluid"
                  />
                </div>
                <div className="p-2 m-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post?.content,
                    }}
                  />
                </div>
              </MDBCard>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className="mt-3" md={8} offsetMd={2}>
            <Card>
              <CardBody className="">
                <div className="d-flex align-items-center my-2">
                  {user && (
                    <a href="#!">
                      <img
                        src={user?.image?.imageUrl}
                        className="border rounded-circle me-2"
                        alt="Avatar"
                        style={{ height: "40px" }}
                      />
                    </a>
                  )}
                  <MDBTextArea
                    label="Write a Comment"
                    id="textAreaExample"
                    rows={2}
                    wrapperClass="w-100"
                    onChange={onChange}
                    value={commentContent}
                  />
                  <MDBBtn
                    size="lg"
                    rippleColor="dark"
                    outline
                    className="ms-3 d-flex justify-content-center align-items-center"
                    onClick={() => {
                      if (commentContent.trim() === "") {
                        toast.error("Comment cannot be empty");
                        return;
                      }
                      creatComment(user.id, post.pid, commentContent)
                        .then((response) => {
                          console.log(response);
                          // setPost({ ...post ,comments:...comments,response});
                          setPost((prevPost) => ({
                            ...prevPost,
                            comments: [response, ...prevPost.comments],
                          }));
                          setCommentContent("");
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.error(
                            "Your session might was expired, please try again"
                          );
                        });
                    }}
                  >
                    Comment
                  </MDBBtn>
                </div>
              </CardBody>
            </Card>
            <div className="comment-container">
              <Card>
                <CardBody>
                  {post.comments &&
                    post.comments
                      .sort((a, b) => b.commentId - a.commentId)
                      .map((comment) => {
                        return (
                          <MDBRow key={comment.commentId}>
                            <MDBCol size={10}>
                              <div
                                key={comment.commentId}
                                className="d-flex align-items-center"
                              >
                                <a href="#!">
                                  <img
                                    src={comment?.user?.image?.imageUrl}
                                    className="border rounded-circle me-2"
                                    alt="Avatar"
                                    style={{ height: "40px" }}
                                  />
                                </a>
                                <div>
                                  <div className="bg-light rounded-3 px-3 py-1">
                                    <a
                                      href="#!"
                                      style={{ textDecoration: "none" }}
                                      className="text-dark mb-0"
                                    >
                                      <strong>{comment.user.name}</strong>
                                    </a>
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: comment.content,
                                      }}
                                      className=""
                                    />
                                  </div>
                                </div>
                              </div>
                            </MDBCol>
                            {user?.id === post?.user?.id ||
                            user?.id === comment?.user?.id ? (
                              <MDBCol size={2} className="">
                                <MDBBtn
                                  onClick={() => {
                                    if (!userContextData.user.login) {
                                      toast.error("Please login");
                                      return;
                                    }
                                    deleteComment(comment.commentId)
                                      .then(() => {
                                        setPost((prevPost) => {
                                          const newComments =
                                            prevPost.comments.filter((c) => {
                                              return (
                                                c.commentId !==
                                                comment.commentId
                                              );
                                            });
                                          return {
                                            ...prevPost,
                                            comments: newComments,
                                          };
                                        });
                                      })
                                      .catch((err) => {});
                                  }}
                                  className=""
                                >
                                  Delete
                                </MDBBtn>
                              </MDBCol>
                            ) : (
                              ""
                            )}
                          </MDBRow>
                        );
                      })}
                </CardBody>
              </Card>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Base>
  );
};

export default PostPage;
