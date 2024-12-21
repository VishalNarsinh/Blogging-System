import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post(`/auth/register`, user).then((response) => response.data);
};

export const signUpAdmin = (user) => {
  return myAxios
    .post(`/auth/register-admin`, user)
    .then((response) => response.data);
};

export const loginUser = (user) => {
  return myAxios.post(`/auth/login`, user).then((response) => response.data);
};

export const getUserById = (id) => {
  return myAxios.get(`/${id}`).then((response) => response.data);
};

export const updateUser = (user, image) => {
  let data = {
    name: user.name,
    email: user.email,
    about: user.about,
  };
  let stringData = JSON.stringify(data);
  let formData = new FormData();
  formData.append("userDto", stringData);
  formData.append("image", image);
  return privateAxios
    .put(`/users/${user.id}`, formData)
    .then((response) => response.data);
};

export const getAllUsers = () => {
  return privateAxios.get("/users/").then((response) => response.data);
};

export const toggleStatus = (id) => {
  return privateAxios
    .put(`/users/toggle/${id}`)
    .then((response) => response.data);
};

export const deleteUser = () => {
  return privateAxios.delete(`/users/delete`).then((response) => response.data);
};
