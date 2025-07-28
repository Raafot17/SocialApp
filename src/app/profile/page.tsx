"use client";
import { getuserPosts, UserData } from "@/lib/postsSlice";
import { store } from "@/lib/store";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Posts from "../_component/Posts/posts";
import Loading from "../loading";
import {
  Box,
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import CreatePost from "../CreatePost/page";
import { toast } from "sonner";
type MyJwtPayload = {
  user: string;
};

export default function Profile() {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { userPosts, userdata } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  async function profilePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    let file = e.target.files?.[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("photo", file);

    try {
      let response = await fetch(
        "https://linked-posts.routemisr.com/users/upload-photo",
        {
          method: "PUT",
          body: formData,
          headers: {
            token: typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
          },
        }
      );

      let data = await response.json();

      if (data?.message === "success") {
        toast.success("✅ Profile photo updated!");
        dispatch(UserData());
      } else {
        toast.error(data?.message || "Failed to upload photo");
      }
    } catch (err) {
      toast.error("Upload failed");
    }
  }
useEffect(() => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);

        if (decoded && typeof decoded === "object" && "user" in decoded) {
          setUserId((decoded as MyJwtPayload).user);
        } else {
          console.warn("✅ Token decoded but no user field found");
        }
      } catch (err) {
        console.error("❌ Invalid token:", err);
      }
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
  }
}, []);

  useEffect(() => {
    if (userId) {
      dispatch(getuserPosts(userId));
      dispatch(UserData());
    }
  }, [userId]);

 

  return <>
<Box
  sx={{
    width: { xs: "100%", md: "90%" },
    margin: "auto",
    mt: "40px",
  }}
>
  <Paper
    elevation={1}
    sx={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      mb: 2,
      borderRadius: 3,
      bgcolor: "#fff",
    }}
  >
    {/* ✅ صورة الغلاف */}
    <Box
      sx={{
        width: "100%",
        height: { xs: 180, md: 280 },
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />

    {/* ✅ الصورة الشخصية */}
      <Box
            sx={{
              position: "absolute",
              top: { xs: 120, md: 200 },
              left: { xs: "50%", md: 30 },
              transform: { xs: "translateX(-50%)", md: "none" },
              textAlign: "center",
            }}
          >
            <input
              type="file"
              id="upload-photo"
              style={{ display: "none" }}
              accept="image/*"
              onChange={profilePhoto}
            />

            <label htmlFor="upload-photo" style={{ cursor: "pointer" }}>
              <Avatar
                src={userdata?.photo}
                alt="Profile"
                sx={{
                  width: { xs: 100, md: 150 },
                  height: { xs: 100, md: 150 },
                  border: "4px solid white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              />
            </label>
          </Box>
    <Box
      sx={{
        mt: { xs: 7, md: 10 },
        px: 3,
        pb: 2,
        textAlign: { xs: "center", md: "left" },
     
      }}
    >
        <Typography variant="h5" fontWeight="bold">
          {userdata?.name}
        </Typography>

      
    </Box>

    {/* ✅ الإحصائيات   */}
    <Grid
      container
      spacing={2}
      sx={{
        textAlign: "center",
        py: 2,
        ml:3,
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee",
      }}
    >
      <Grid >
        <Typography variant="h6" fontWeight="bold">
          {userPosts?.length || 0}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posts
        </Typography>
      </Grid>
      <Grid >
        <Typography variant="h6" fontWeight="bold">
          5.4k
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Followers
        </Typography>
      </Grid>
      <Grid >
        <Typography variant="h6" fontWeight="bold">
          320
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Following
        </Typography>
      </Grid>
    </Grid>

    {/* ✅ Tabs Navigation زي  */}
    <Tabs
      value={selectedTab}
      onChange={(_, newValue) => setSelectedTab(newValue)}
      centered
      indicatorColor="primary"
      textColor="primary"
      sx={{
        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 600,
          fontSize: { xs: 12, md: 14 },
          minWidth: { xs: "auto", md: 120 },
        },
      }}
    >
      <Tab label="Posts" />
      <Tab label="About" />
      <Tab label="Friends" />
      <Tab label="Photos" />
    </Tabs>
  </Paper>
</Box>


  <CreatePost/>

      {/* ✅ بوستات المستخدم */}
      <Box
        sx={{
          m: "auto",
        }}
      >
    {userPosts ? (
  [...userPosts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .map((post) => <Posts key={post._id} postObject={post} />)
) : (
  <Loading />
)}

      </Box>

 </>
}
