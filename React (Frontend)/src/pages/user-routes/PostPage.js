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
import { getPostById, getLikeCount, checkLike, toggleLike } from "../../services/post-service";
import { getCurrentUser, isLoggedIn } from "../../auth";
import { creatComment, deleteComment } from "../../services/commet-service";
import { Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import UserContext from "./../../context/UserContext";

const PostPage = () => {
  const userContextData = useContext(UserContext);

  const getImageUrl = (imageMap) => {
    if (!imageMap || Object.keys(imageMap).length === 0) return "";
    return imageMap.imageUrl || Object.values(imageMap)[0];
  };

  const { pid } = useParams();

  const [post, setPost] = useState({});
  const [user, setUser] = useState(getCurrentUser());
  const [commentContent, setCommentContent] = useState("");

  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showAnimateHeart, setShowAnimateHeart] = useState(false);
  const [miniHearts, setMiniHearts] = useState([]);

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
      })
      .catch((error) => {
        toast.error("No such post exists");
        navigate("/");
        console.log(error);
      });

    getLikeCount(pid)
      .then((data) => {
        setLikeCount(data.count);
      })
      .catch((error) => {
        console.error("Error loading like count", error);
      });

    if (isLoggedIn()) {
      checkLike(pid)
        .then((data) => {
          setIsLiked(data.success);
        })
        .catch((error) => {
          console.error("Error checking like status", error);
        });
    }
  }, [pid]);

  const handleLikeToggle = () => {
    if (!isLoggedIn()) {
      toast.error("Please login to like this post");
      return;
    }
    toggleLike(pid)
      .then((response) => {
        if (response.success) {
          setIsLiked(!isLiked);
          setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
          toast.success(response.message);
        }
      })
      .catch((error) => {
        console.error("Error toggling like", error);
        toast.error("Could not toggle like");
      });
  };

  const handleDoubleTap = (e) => {
    if (!isLoggedIn()) {
      toast.error("Please login to like this post");
      return;
    }

    const newMiniHearts = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      style: {
        left: `${50 + (Math.random() * 40 - 20)}%`,
        top: `${50 + (Math.random() * 40 - 20)}%`,
        "--drift-x": `${Math.random() * 80 - 40}px`,
        "--rotate-deg": `${Math.random() * 90 - 45}deg`,
        animationDelay: `${Math.random() * 0.15}s`,
        animationDuration: `${1 + Math.random() * 0.5}s`,
      },
    }));

    setMiniHearts((prev) => [...prev, ...newMiniHearts]);

    setShowAnimateHeart(true);
    setTimeout(() => {
      setShowAnimateHeart(false);
    }, 1000);

    setTimeout(() => {
      setMiniHearts((prev) => prev.filter((h) => !newMiniHearts.includes(h)));
    }, 1600);

    if (!isLiked) {
      toggleLike(pid)
        .then((response) => {
          if (response.success) {
            setIsLiked(true);
            setLikeCount((prev) => prev + 1);
            toast.success(response.message);
          }
        })
        .catch((error) => {
          console.error("Error toggling like on double-tap", error);
        });
    }
  };

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
                    maxWidth: "100%",
                  }}
                >
                  <div
                    className="heart-overlay-container d-flex justify-content-center align-items-center"
                    onDoubleClick={handleDoubleTap}
                    style={{
                      position: "relative",
                      maxWidth: "50%",
                      maxHeight: "500px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={getImageUrl(post?.image)}
                      alt=""
                      className="img-fluid rounded"
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                    <MDBIcon
                      fas
                      icon="heart"
                      className={`floating-heart ${showAnimateHeart ? "animate" : ""}`}
                    />
                    {miniHearts.map((heart) => (
                      <MDBIcon
                        key={heart.id}
                        fas
                        icon="heart"
                        className="floating-mini-heart"
                        style={heart.style}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-2 m-2">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post?.content,
                    }}
                  />
                </div>

                {/* Like Button & Count section */}
                <div className="p-2 mx-2 mb-2 d-flex align-items-center">
                  <MDBBtn
                    color="link"
                    className="p-0 text-decoration-none"
                    onClick={handleLikeToggle}
                    style={{ boxShadow: "none" }}
                  >
                    <MDBIcon
                      far={!isLiked}
                      fas={isLiked}
                      icon="heart"
                      className={`fa-2x ${isLiked ? "text-danger" : "text-muted"}`}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                    />
                  </MDBBtn>
                  <span className="ms-2 fw-bold text-muted" style={{ fontSize: "1.1rem" }}>
                    {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                  </span>
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
