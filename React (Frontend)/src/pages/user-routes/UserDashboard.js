import React, { useEffect, useState } from "react";
import Base from "./../../components/Base";
import { getCurrentUser } from "../../auth";
import { toast } from "react-toastify";
import { getPostByUser } from "../../services/post-service";
import { Col, Container, Row } from "reactstrap";
import Blog from "../../components/Blog";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      toast.error("Please login first");
    }
    // console.log(user);
    getPostByUser(currentUser.id)
      .then((response) => {
        setPosts([...response]);
        // console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  const removeBlog = (pid) => {
    // setPosts((oldPosts) => {
    //   const newPosts = oldPosts.filter((post) => {
    //     return post.pid !== pid;
    //   });
    //   return newPosts;
    // });
    setPosts(posts.filter((post) => post.pid !== pid));
  };
  return (
    <>
      <Base>
        <Container>
          <Row>
            {/* <Feed></Feed> */}
            {posts &&
              posts.map((post) => (
                <Col key={post.pid} sm="12" md="6" lg="4">
                  <Blog updateUi={removeBlog} post={post}></Blog>
                </Col>
              ))}

            {posts.length <= 0 ? (
              <div className="d-flex justify-content-center align-items-center mt-5">
                <h1 className="display-1">You havent posted any blog</h1>
              </div>
            ) : (
              ""
            )}
          </Row>
        </Container>
      </Base>
    </>
  );
};

export default UserDashboard;
