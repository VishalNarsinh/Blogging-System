import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import UserDashboard from "./pages/user-routes/UserDashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import AddComponent from "./components/AddComponent";
import PostPage from "./pages/user-routes/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/user-routes/Categories";
import UpdateBlog from "./pages/UpdateBlog";
import AdminSignup from "./pages/admin/AdminSignup";
import AddCategory from "./pages/admin/AddCategory";
import ShowCategory from "./pages/admin/ShowCategories";
import EditCategory from "./pages/admin/EditCategory";
import ShowUsers from "./pages/admin/ShowUsers";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/add-blog" element={<AddComponent />} />
          <Route path="/post/:pid" element={<PostPage />} />
          <Route path="/home/post/:pid" element={<PostPage />} />
          <Route path="/category/:cid" element={<Categories />} />
          <Route path="/home/category/:cid" element={<Categories />} />

          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="my-blogs" element={<UserDashboard />} />
            <Route path="profile-info" element={<ProfileInfo />} />
            <Route path="update-blog/:pid" element={<UpdateBlog />} />
          </Route>

          <Route path="/admin" element={<PrivateRoutes />}>
            <Route path="add-category" element={<AddCategory />} />
            <Route path="show-categories" element={<ShowCategory />} />
            <Route path="show-users" element={<ShowUsers />} />
            <Route path="edit-category/:cid" element={<EditCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
