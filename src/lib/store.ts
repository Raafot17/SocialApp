import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { postreducer } from "./postsSlice";


export let store = configureStore({
    reducer:{
      auth:  authReducer,
      posts :postreducer
 }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;