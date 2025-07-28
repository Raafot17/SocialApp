"use client";

import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { store } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "@/lib/postsSlice";



export default function CreatePost() {
  const router = useRouter();
const dispatch = useDispatch<typeof store.dispatch>();
  const { userdata } = useSelector(
    (state: ReturnType<typeof store.getState>) => state.posts
  );
  
  
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!postText.trim() && !selectedFile) {
      toast.error("Please write something or add a photo.");
      return;
    }

    const formData = new FormData();
    formData.append("body", postText);
    if (selectedFile) formData.append("image", selectedFile);

    setLoading(true);
    try {
      let response = await fetch(`https://linked-posts.routemisr.com/posts`, {
        method: "POST",
        body: formData,
        headers: {
          token: `${localStorage.getItem("token")}`,
        },
      });

      let data = await response.json();
      if (data.message === "success") {
        toast.success("✅ Post created successfully!");
        setPostText("");
        setSelectedFile(null);
        router.refresh(); // تحديث الصفحة لعرض البوست
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    dispatch(UserData())
  }, [])
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 3,
        bgcolor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        p: 2,
      }}
    >
      {/* ✅ العنوان */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        Create Post
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* ✅ صورة البروفايل وكتابة البوست */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          src={userdata?.photo}
          sx={{ width: 45, height: 45 }}
        />
        <TextField
          fullWidth
          placeholder="What's on your mind?"
          multiline
          minRows={3}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          sx={{
            bgcolor: "#f0f2f5",
            borderRadius: "10px",
            "& fieldset": { border: "none" },
          }}
        />
      </Box>

      
      {selectedFile && (
        <Box sx={{ mt: 2, position: "relative" }}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            style={{
              width: "100%",
              borderRadius: "10px",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* ✅ اختيارات زي فيسبوك */}
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {/* إضافة صورة */}
        <Box>
          <input
            type="file"
            id="imageUpload"
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="imageUpload">
            <IconButton component="span" sx={{ color: "#45bd62" }}>
              <ImageIcon />
            </IconButton>
            <Typography
              variant="body2"
              component="span"
              sx={{ ml: 0.5, color: "gray" }}
            >
              Photo/Video
            </Typography>
          </label>
        </Box>

        {/* تاج فريندز */}
        <Box>
          <IconButton sx={{ color: "#1877f2" }}>
            <PersonAddAlt1Icon />
          </IconButton>
          <Typography
            variant="body2"
            component="span"
            sx={{ ml: 0.5, color: "gray" }}
          >
            Tag Friends
          </Typography>
        </Box>

        {/* فيلينج/اكتيفتي */}
        <Box>
          <IconButton sx={{ color: "#f7b928" }}>
            <EmojiEmotionsIcon />
          </IconButton>
          <Typography
            variant="body2"
            component="span"
            sx={{ ml: 0.5, color: "gray" }}
          >
            Feeling/Activity
          </Typography>
        </Box>
      </Box>

      {/* ✅ زرار Post */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#1877f2",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": { bgcolor: "#166fe5" },
        }}
        disabled={loading || (!postText.trim() && !selectedFile)}
      >
        {loading ? "Posting..." : "Post"}
      </Button>
    </Box>
  );
}
