import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState: {
  userToken: null | string;
  userData: null | any;
  isError:  string;
  isloading: boolean;
} = {
  userToken: null,
  userData: null,
  isError: "",
  isloading: false,
};

export const userLogin = createAsyncThunk(
  "authSlice/userLogin",
  async (formData: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://linked-posts.routemisr.com/users/signin`,
        formData
      );
      return res.data; // ده بسيط ومفيش مشكلة
    } catch (err: any) {
      // ✅ خليك متأكد بترجع بس String أو Object بسيط
      let errorMessage =
        err?.response?.data?.error || err?.message || "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const Regester = createAsyncThunk(
  "authSlice/Regester",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(
        `https://linked-posts.routemisr.com/users/signup`,
        formData
      );
      return res.data;
    } catch (err: any) {
      let errorMessage =
        err?.response?.data?.error || err?.message || "Signup failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);




let authSlice = createSlice({
  name: "authSlice",
  initialState,

  reducers: {
    clearData: (state) => {
      state.userToken = null;
      state.userData = null;
    },
  },

  extraReducers: (builder) => {
    // ✅ userLogin
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isloading = false;
      state.userToken = action.payload.token; // ✅ هيجي من login فقط
      state.userData = action.payload.user || null;
    });

    builder.addCase(userLogin.pending, (state) => {
      state.isloading = true;
    });

 builder.addCase(userLogin.rejected, (state, action) => {
  state.isError = (action.payload as string) || "Login Failed";
  state.isloading = false;
});


    // ✅ Regester (signup)
    builder.addCase(Regester.fulfilled, (state, action) => {
      state.isloading = false;
      state.userData = action.payload.user || null; // ✅ بس بيانات اليوزر
    });

    builder.addCase(Regester.pending, (state) => {
      state.isloading = true;
    });

  
 builder.addCase(Regester.rejected, (state, action) => {
  state.isError = (action.payload as string) || "si Failed";
  state.isloading = false;
});
  },
});

export let authReducer = authSlice.reducer;
export let { clearData } = authSlice.actions;
