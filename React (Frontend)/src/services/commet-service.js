import { getCurrentUser } from "../auth";
import { privateAxios } from "./helper";

export const creatComment = (uid, pid, content) => {
  // let currentUser = getCurrentUser();
  // if (currentUser == null) {
  //   return Promise.reject(new Error("User not logged in"));
  // }

  return privateAxios
    .post(`/user/${uid}/post/${pid}/comments`, {
      content: content,
    })
    .then((response) => response.data);
};

export const deleteComment = (commentId) => {
  return privateAxios
    .delete(`/comments/${commentId}`)
    .then((response) => response.data);
};
