import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link, NavLink as ReactLink, useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth";
import UserContext from "../context/UserContext";
import { searchPost } from "../services/post-service";

function CustomNavbar() {
  const navigate = useNavigate();

  const userContextData = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);

  const [user, setUser] = useState(getCurrentUser());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        searchPost(query)
          .then((results) => {
            setSearchResults(results); // Update the search results
            console.log("Search Results:", results);
          })
          .catch((err) => {
            console.error("Error during search:", err);
          });
      } else {
        setSearchResults([]); // Clear results if input is empty
      }
    }, 300), // 300ms debounce delay
    []
  );

  const onSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query); // Trigger search
  };

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  }, [login]);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [userContextData]);

  const logout = () => {
    doLogout(() => {
      userContextData.setUser({
        data: {},
        login: false,
      });
      setLogin(false);
      navigate("/");
    });
  };

  const isAdmin = useMemo(
    () => user?.roles.some((role) => role.name === "ROLE_ADMIN"),
    [user]
  );

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" className="px-5" expand="md" sticky="top">
      <NavbarBrand tag={ReactLink} to="/" href="/">
        <MDBIcon fab icon="blogger me-2" color="primary" />
        Blog-App
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/">
              FEED
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about">
              ABOUT
            </NavLink>
          </NavItem>
          {user?.live && (
            <NavItem>
              <NavLink tag={ReactLink} to="/add-blog">
                CREATE A BLOG
              </NavLink>
            </NavItem>
          )}
          {userContextData.user.login && (
            <NavItem>
              <NavLink tag={ReactLink} to="/user/my-blogs" className="">
                MY BLOGS
              </NavLink>
            </NavItem>
          )}
          {isAdmin && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/add-category" className="">
                  ADD CATEGORY
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  tag={ReactLink}
                  to="/admin/show-categories"
                  className=""
                >
                  SHOW CATEGORY
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/show-users" className="">
                  SHOW USERS
                </NavLink>
              </NavItem>
            </>
          )}
          {!userContextData.user.login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login">
                  LOGIN
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/signup">
                  SIGNUP
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/admin/signup">
                  ADMIN-SIGNUP
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>

        {/* Search Bar Section */}
        <div className="search-container position-relative">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={onSearchInputChange}
          />
          {searchResults.length > 0 && (
            <div
              className="search-results position-absolute bg-white shadow rounded"
              style={{ zIndex: 1050, top: "100%", left: 0, right: 0 }}
            >
              <ul className="list-group">
                {searchResults.map((result) => (
                  <Link
                    to={"/post/" + result.pid}
                    className="text-decoration-none"
                  >
                    <li
                      key={result.id}
                      className="list-group-item cursor-pointer"
                      onClick={() => {
                        setSearchQuery(""); // Clear search after navigation
                        setSearchResults([]); // Clear dropdown
                      }}
                    >
                      {result.title}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Nav navbar>
          {userContextData.user.login && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/user/profile-info">
                  {user.image && (
                    <img
                      src={user.image.imageUrl}
                      alt=""
                      style={{
                        maxHeight: 35,
                        maxWidth: 35,
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  {user.name}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={logout}
                  className="mt-1"
                >
                  LOGOUT
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
