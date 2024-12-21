import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from "../../components/CategorySideMenu";
import { getPostByCategory } from "../../services/post-service";
import Blog from "../../components/Blog";

function Categories() {
  const { cid } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log(cid);
    getPostByCategory(cid)
      .then((response) => {
        console.log(response);
        setPosts([...response]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cid]);
  const removeBlog = (pid) => {
    setPosts(posts.filter((post) => post.pid !== pid));
  };
  return (
    <Base>
      <Container fluid>
        <Row>
          <Col md={2} className="py-5 ps-5">
            <CategorySideMenu></CategorySideMenu>
          </Col>
          <Col md={10} className="pe-5">
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
                  <h1 className="border rounded">No Blogs in this category</h1>
                </div>
              ) : (
                ""
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default Categories;
