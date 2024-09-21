import { createSlice } from "@reduxjs/toolkit";
import {fetchPosts ,addPost, updatePost, deletePost, fetchPostWithId, fetchPostComments} from "../APIs/postsApi"

export const postsSlice = createSlice({
  name: "postsData",

  initialState: {
    posts: [],
    currentPost: {post:null, comments:null},
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, actions) => {
      state.posts = actions.payload;
    });

    builder.addCase(addPost.fulfilled, (state, actions) => {
      state.posts.push(actions.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, actions) => {

      const postIndex = state.posts.findIndex(
        (post) => post.id === actions.payload.id
      );
      
      if(postIndex !== -1) {// -1 means not found in array
        state.posts[postIndex] = actions.payload
      }
    });
    builder.addCase(deletePost.fulfilled, (state, action)=>{
      console.log(action.payload)
      const idx= state.posts.findIndex((post)=> post.id===action.payload);
      console.log("idx=",idx)
      if(idx !== -1){
        state.posts = [...state.posts.slice(0, idx), ...state.posts.slice(idx + 1)]
      }
    });
    builder.addCase(fetchPostWithId.rejected, (state, action)=>{
      console.log("Moshkela:", action);
      state.currentPost = {...state.currentPost,post:{title:action.type, body:""}};
    })
    builder.addCase(fetchPostWithId.fulfilled, (state, action)=>{
      state.currentPost.post = action.payload;
    }).addCase(fetchPostComments.fulfilled, (state, action)=>{
      console.log("Inside builder: ",action.payload)
      state.currentPost.comments = action.payload;
    })
  },
});

export default postsSlice.reducer;
