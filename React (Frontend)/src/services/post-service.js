import { toast } from "react-toastify";
import { getCurrentUser } from "../auth";
import { myAxios, privateAxios } from "./helper";

export const createPost = (post, image) => {
  let currentUser = getCurrentUser();
  // if (currentUser == null) {
  //   return Promise.reject(new Error("User not logged in"));
  // }
  let userId = currentUser.id;
  const formData = new FormData();
  formData.append("postDto", JSON.stringify(post));
  formData.append("image", image);
  return privateAxios
    .post(`/user/${userId}/category/${post.cId}/posts`, formData)
    .then((response) => response.data);
};

export const getAllPost = (
  pageNumber = 0,
  pageSize = 6,
  sortBy = "dateAdded",
  sortDir = "dsc"
) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};

export const getPostById = (pid) => {
  return myAxios.get(`/posts/${pid}`).then((response) => response.data);
};

export const getPostByCategory = (cid) => {
  return myAxios
    .get(`/category/${cid}/posts`)
    .then((response) => response.data);
};

export const getPostByUser = (id) => {
  return myAxios.get(`/user/${id}/posts`).then((response) => response.data);
};

export const searchPost = (keyword) => {
  return myAxios
    .get(`/posts/search/${keyword}`)
    .then((response) => response.data);
};

export const deleteBlog = (pid) => {
  return privateAxios.delete(`/posts/${pid}`).then((response) => response.data);
};

export const updateBlog = (post, image) => {
  let pId = post.pid;
  let cId = post.cId;
  let data = new FormData();
  data.append("postDto", JSON.stringify(post));
  data.append("image", image);
  return privateAxios
    .put(`/posts/${pId}/category/${cId}`, data)
    .then((response) => response.data);
};
