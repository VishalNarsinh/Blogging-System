import {
  MDBBtn,
  MDBCard,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import { getAllPost } from "../services/post-service";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";
const Feed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    totalPages: "",
    totalElements: "",
    pageSize: "",
    pageNumber: "",
    lastPage: false,
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    // load all posts from server
    // getAllPost()
    //   .then((response) => {
    //     console.log(response);
    //     setPostContent(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    changePage(currentPage);
  }, [currentPage]);

  const changePage = (
    pageNumber = 0,
    pageSize = 6,
    sortBy = "dateAdded",
    sortDir = "dsc"
  ) => {
    getAllPost(pageNumber, pageSize, sortBy, sortDir)
      .then((response) => {
        setPostContent({
          content: [...postContent.content, ...response.content],
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          pageSize: response.pageSize,
          pageNumber: pageNumber,
          lastPage: response.lastPage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeBlog = (pid) => {
    setPostContent((oldPostContent) => {
      const newPosts = oldPostContent.content.filter((post) => {
        return post.pid !== pid;
      });
      return {
        ...oldPostContent,
        content: newPosts,
      };
    });
  };
  const changePageInfinite = () => {
    console.log("changed");
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <MDBContainer className="py-5">
        <InfiniteScroll
          dataLength={postContent.content.length}
          next={changePageInfinite}
          hasMore={!postContent.lastPage}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <MDBRow>
            {postContent?.content.map((post) => (
              <MDBCol key={post.pid} sm="12" md="6" lg="4">
                <Blog updateUi={removeBlog} post={post} />{" "}
              </MDBCol>
            ))}
          </MDBRow>
        </InfiniteScroll>
        {/* <MDBRow>
          <MDBCol sm={8} offsetSm={2} md={8} offsetMd={4}>
            <Pagination size="lg">
              <PaginationItem
                disabled={postContent.pageNumber === 0}
                onClick={() => {
                  changePage(0);
                }}
              >
                <PaginationLink first />
              </PaginationItem>
              <PaginationItem
                disabled={postContent.pageNumber === 0}
                onClick={() => {
                  if (postContent.pageNumber > 0) {
                    changePage(postContent.pageNumber - 1);
                  }
                }}
              >
                <PaginationLink previous />
              </PaginationItem>

              {[...Array(postContent?.totalPages)].map((item, index) => {
                return (
                  <PaginationItem
                    key={index}
                    onClick={() => {
                      changePage(index);
                    }}
                    active={index === postContent.pageNumber}
                  >
                    <PaginationLink>{index + 1}</PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem
                disabled={postContent.lastPage}
                onClick={() => {
                  if (!postContent.lastPage) {
                    changePage(postContent.pageNumber + 1);
                  }
                }}
              >
                <PaginationLink next />
              </PaginationItem>
              <PaginationItem
                disabled={postContent.lastPage}
                onClick={() => {
                  changePage(postContent.totalPages - 1);
                }}
              >
                <PaginationLink last />
              </PaginationItem>
            </Pagination>
          </MDBCol>
        </MDBRow> */}
      </MDBContainer>
    </>
  );
};

export default Feed;
