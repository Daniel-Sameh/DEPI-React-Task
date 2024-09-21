import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(Base_URL);
  return response.data;
});

export const fetchPostWithId = createAsyncThunk("posts/fetchPostWithId", async (id) => {
  const response = await axios.get(`${Base_URL}/${id}`);
  // console.log("post return from api: ",response.data);
  return response.data;
});
export const fetchPostComments = createAsyncThunk("posts/fetchPostComments", async (id) => {
  const response = await axios.get(`${Base_URL}/${id}/comments`);
  console.log("post comments return from api: ",response.data);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (postInfo) => {
  const response = await axios.post(Base_URL, postInfo);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`${Base_URL}/${id}`, updatedData);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ id, deleteData }) => {
    console.log("delete post #", id)
    const response = await axios.delete(`${Base_URL}/${id}`, deleteData);
    return id;
  }
);
