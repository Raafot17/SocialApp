"use client";
import { Box, Grid } from "@mui/material";
import Posts from "./_component/Posts/posts";
import { getAllPosts } from "@/lib/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { store } from "@/lib/store";
import { PostType } from "./_interfaces/home";
import Loading from "./loading";
import CreatePost from "./CreatePost/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<typeof store.dispatch>();
  const { allPosts  } = useSelector((state: ReturnType<typeof store.getState>) => state.posts);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return; 
    }

    dispatch(getAllPosts(50));

  }, []);

  return (
    <Box>
   
      <Box>
        <CreatePost />
        <Box sx={{ mt: 3 }}>
          {allPosts && allPosts.length > 0 ? (
            allPosts.map((postObj: PostType) => <Posts key={postObj._id} postObject={postObj} />)
          ) : (
            <Loading />
          )}
        </Box>
      </Box>
         

    
    </Box>
  );
}

