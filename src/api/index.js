import axios from "axios";

const API = axios.create({
  baseURL: "https://posts-server-side.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (data) => API.post("/user/signIn", data);
export const signUp = (data) => API.post("/user/signUp", data);

export const savePost = (data) => API.post("/user/savePost", data);
export const getSearches = (email) => API.get(`/user/getSearches/${email}`);

export const getPosts = (email) => API.get(`/post/getPosts/${email}`);
export const post = (email, formData) =>
  API.post(`/post/post/${email}`, formData);
export const updatePost = (email, id, formData) =>
  API.patch(`/post/updatePost/${email}/${id}`, formData);
export const deletePost = (email, id) =>
  API.delete(`/post/deletePost/${email}/${id}`);
