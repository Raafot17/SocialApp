import { PostType, UserType } from './../app/_interfaces/home';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState: { allPosts: PostType[] | null; singlePost: PostType | null ;userPosts:PostType[]|null ;
  userdata:UserType|null;
 } = {
  allPosts: null,
  singlePost: null,
  userPosts :null,
  userdata:null
};

// Get all posts (optionally with limit)
export const getAllPosts = createAsyncThunk("postsSlice/getAllPosts", async (limit?: number) => {
  const res = await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit || 25}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return res.data; // return فقط البيانات
});

// Get single post by ID
export const getPost = createAsyncThunk("postsSlice/getPost", async (id: string) => {
  const res = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return res.data;
});

// Get all posts by a specific user
export const getuserPosts = createAsyncThunk("postsSlice/userPosts", async (id: string) => {
  const res = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return res.data;
  // console.log(res.data);
  
});
export const UserData = createAsyncThunk("postsSlice/UserData", async () => {
  const res = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return res.data;

  
});

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.allPosts = action.payload.posts;
      // console.log("Fetched posts:", action.payload.posts);
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.singlePost = action.payload.post;
    });

builder.addCase(getuserPosts.fulfilled, (state, action) => {
  state.userPosts = action.payload.posts;
  
});
builder.addCase(UserData.fulfilled, (state, action) => {
  state.userdata = action.payload.data.user;
  // console.log(action.payload.data.user);
  

});

  },
});

export const postreducer = postsSlice.reducer;
