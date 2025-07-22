"use client";
import Posts from "@/app/_component/Posts/posts";
import Loading from "@/app/loading";
import { getPost } from "@/lib/postsSlice";
import { store } from "@/lib/store";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { use } from "react"; // 👈 مهم

interface IdPageProps {
  params: Promise<{ id: string }>; // 👈 لأن params بقت Promise
}

export default function Id(props: IdPageProps) {
  const { id } = use(props.params); // 👈 فك الـ Promise

  const dispatch = useDispatch<typeof store.dispatch>();
  const { singlePost } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  useEffect(() => {
    dispatch(getPost(id)); // 👈 استخدم id بعد فكّه
  }, []);

  return singlePost ? (
    <Box mt={10}>
      <Posts postObject={singlePost} />
    </Box>
  ) : (
    <Loading />
  );
}
