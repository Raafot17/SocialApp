import { PostType, UserType } from './../app/_interfaces/home';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState: {
  allPosts: PostType[] | null;
  singlePost: PostType | null;
  userPosts: PostType[] | null;
  userdata: UserType | null;
} = {
  allPosts: null,
  singlePost: null,
  userPosts: null,
  userdata: null
};

// ✅ Helper للحصول على التوكن بأمان
function getTokenSafe() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export const getAllPosts = createAsyncThunk(
  "postsSlice/getAllPosts",
  async (limit?: number) => {
    const token = getTokenSafe();
    const res = await axios.get(
      `https://linked-posts.routemisr.com/posts?limit=${limit || 25}`,
      {
        headers: token ? { token } : {},
      }
    );
    return res.data;
  }
);

export const getPost = createAsyncThunk(
  "postsSlice/getPost",
  async (id: string) => {
    const token = getTokenSafe();
    const res = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: token ? { token } : {},
    });
    return res.data;
  }
);

export const getuserPosts = createAsyncThunk(
  "postsSlice/userPosts",
  async (id: string) => {
    const token = getTokenSafe();
    const res = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: token ? { token } : {},
    });
    return res.data;
  }
);

export const UserData = createAsyncThunk("postsSlice/UserData", async () => {
  const token = getTokenSafe();
  const res = await axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
    headers: token ? { token } : {},
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
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.singlePost = action.payload.post;
    });

    builder.addCase(getuserPosts.fulfilled, (state, action) => {
      state.userPosts = action.payload.posts;
    });

    builder.addCase(UserData.fulfilled, (state, action) => {
      state.userdata = action.payload.user;
      
      
      
    });
  },
});

export const postreducer = postsSlice.reducer;

