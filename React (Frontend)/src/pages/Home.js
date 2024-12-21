import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import Feed from "../components/Feed";
import CategorySideMenu from "../components/CategorySideMenu";
import { getAllPost } from "../services/post-service";
import { Col, Container, Row } from "reactstrap";

function Home() {
  return (
    <>
      <Base>
        <Container fluid>
          <Row>
            <Col md={2} className="py-5 ps-5">
              <CategorySideMenu></CategorySideMenu>
            </Col>
            <Col md={10} className="pe-5">
              <Feed></Feed>
            </Col>
          </Row>
        </Container>
      </Base>
    </>
  );
}

export default Home;
