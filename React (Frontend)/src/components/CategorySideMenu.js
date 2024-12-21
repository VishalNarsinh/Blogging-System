import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadCategories } from "../services/category-service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CategorySideMenu() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          toast.error("Can't connect to the server");
        }
        console.log(error);
      });
  }, []);
  //   console.log(categories);
  return (
    <ListGroup className="py-3" style={{ position: "sticky", top: "120px" }}>
      <ListGroupItem
        tag={Link}
        to="/"
        action={true}
        className="shadow-5 bg-light mt-1"
      >
        All Blogs
      </ListGroupItem>
      {categories.length > 0 &&
        categories.map((category) => (
          <ListGroupItem
            tag={Link}
            to={`/category/${category.cid}`}
            className="shadow-5 bg-light mt-1"
            action={true}
            key={category.cid}
          >
            {category.name}
          </ListGroupItem>
        ))}
    </ListGroup>
  );
}

export default CategorySideMenu;
