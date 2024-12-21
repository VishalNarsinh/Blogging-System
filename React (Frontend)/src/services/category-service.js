import { myAxios, privateAxios } from "./helper";

export const loadCategories = () => {
  return myAxios.get("/categories/").then((response) => response.data);
};

export const addCategory = (data) => {
  return privateAxios
    .post("/categories/", data)
    .then((response) => response.data);
};

export const getCategoryById = (cid) => {
  return myAxios.get(`/categories/${cid}`).then((response) => response.data);
};

export const updateCategory = (data) => {
  return privateAxios
    .put(`/categories/${data.cid}`, data)
    .then((response) => response.data);
};

export const deleteCategory = (cid) => {
  return privateAxios
    .delete(`/categories/${cid}`)
    .then((response) => response.data);
};
