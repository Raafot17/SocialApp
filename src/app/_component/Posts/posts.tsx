"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendIcon from "@mui/icons-material/Send";
import { PostType } from "@/app/_interfaces/home";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function FacebookPost({ postObject }: { postObject: PostType }) {
  const [comments, setComments] = React.useState([]);
  const [loadingComments, setLoadingComments] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  // ✅ State لتعديل البوست
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editBody, setEditBody] = React.useState(postObject.body || "");
  const [editImage, setEditImage] = React.useState<File | null>(null);
  const [loadingUpdate, setLoadingUpdate] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isSinglePostPage = pathname.startsWith("/post/");

  const handleNavigate = (id: string) => router.push(`/user/${id}`);

  async function fetchComments() {
    try {
      setLoadingComments(true);
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : "";
      const res = await fetch(
        `https://linked-posts.routemisr.com/posts/${postObject._id}/comments`,
        {
          headers: {
            token: token || "",
          },
        }
      );
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setLoadingComments(false);
    }
  }

  React.useEffect(() => {
    if (isSinglePostPage) fetchComments();
  }, [postObject._id]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoadingDelete(true);
    try {
      const res = await fetch(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token") || "",
          },
        }
      );
      const data = await res.json();
      if (data.message === "success") {
        router.refresh();
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setLoadingDelete(false);
      handleMenuClose();
    }
  }

  // ✅ فتح مودال التعديل
  const openUpdateModal = () => {
    setEditBody(postObject.body || "");
    setEditImage(null);
    setOpenEdit(true);
    handleMenuClose();
  };

  // ✅ تنفيذ التعديل
  async function handleUpdate(id: string) {
    if (!editBody.trim() && !editImage) {
      alert("Please add content or an image");
      return;
    }

    setLoadingUpdate(true);
    try {
      const formData = new FormData();
      formData.append("body", editBody);
      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await fetch(`https://linked-posts.routemisr.com/posts/${id}` , {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token") || ""
        },
        body: formData
      });

      const data = await res.json();
      if (data.message === "success") {
        alert("✅ Post updated successfully!");
        setOpenEdit(false);
        router.refresh();
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoadingUpdate(false);
    }
  }

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const values = {
      content: form.comment.value,
      post: postObject._id,
    };

    await fetch(`https://linked-posts.routemisr.com/comments`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        token: `${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
    });

    form.reset();
    fetchComments();
  }

  return (
    <>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          margin: "20px auto",
          bgcolor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        {/* ✅ هيدر البوست */}
        <CardHeader
          avatar={
            <Avatar
              src={postObject.user.photo}
              alt={postObject.user.name}
              sx={{ cursor: "pointer" }}
              onClick={() => handleNavigate(postObject.user._id)}
            />
          }
          action={
            pathname.startsWith("/profile") && (
              <>
                <IconButton onClick={handleMenuOpen}>
                  {loadingDelete ? <CircularProgress size={20} /> : <MoreHorizIcon />}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={openUpdateModal}>Update</MenuItem>
                  <MenuItem onClick={() => handleDelete(postObject._id)}>
                    Delete
                  </MenuItem>
                </Menu>
              </>
            )
          }
          title={
            <Typography
              onClick={() => handleNavigate(postObject.user._id)}
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {postObject.user.name}
            </Typography>
          }
          subheader={
            <Typography sx={{ fontSize: "12px", color: "gray" }}>
              {new Date(postObject.createdAt).toLocaleString()}
            </Typography>
          }
        />

        {/* ✅ نص البوست */}
        <CardContent sx={{ pt: 0 }}>
          {postObject.body && (
            <Typography sx={{ fontSize: 15, mb: 1 }}>{postObject.body}</Typography>
          )}
        </CardContent>

        {/* ✅ صورة البوست */}
        {postObject.image && (
          <CardMedia
            component="img"
            image={postObject.image}
            alt="Post Image"
            sx={{
              maxHeight: 400,
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        )}

        {/* ✅ عداد التفاعلات */}
        <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", color: "gray" }}>
          <Typography sx={{ fontSize: 14 }}>👍 120 Likes</Typography>
          <Typography sx={{ fontSize: 14 }}>
            {comments.length} Comments • 10 Shares
          </Typography>
        </Box>

        <Divider />

        {/* ✅ أزرار Like - Comment - Share */}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            px: 1,
            py: 0.5,
          }}
        >
          <Button
            startIcon={<ThumbUpOffAltIcon />}
            sx={{ color: "gray", textTransform: "none", fontWeight: "bold" }}
          >
            Like
          </Button>

          <Link href={`/post/${postObject._id}`} passHref>
            <Button
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{ color: "gray", textTransform: "none", fontWeight: "bold" }}
            >
              Comment
            </Button>
          </Link>

          <Button
            startIcon={<ShareOutlinedIcon />}
            sx={{ color: "gray", textTransform: "none", fontWeight: "bold" }}
          >
            Share
          </Button>
        </CardActions>

        <Divider />

        {/* ✅ التعليقات (لو دخلنا صفحة البوست فقط) */}
        {isSinglePostPage && (
          <Box sx={{ p: 2 }}>
            {/* ✅ إضافة كومنت */}
            <form onSubmit={handleComment} style={{ display: "flex", gap: 8 }}>
              <Avatar
                src={postObject.user.photo}
                sx={{ width: 35, height: 35 }}
              />
              <TextField
                name="comment"
                placeholder="Write a comment..."
                size="small"
                fullWidth
                sx={{
                  bgcolor: "#f0f2f5",
                  borderRadius: "20px",
                  "& .MuiOutlinedInput-root": { borderRadius: "20px" },
                }}
              />
              <IconButton type="submit">
                <SendIcon sx={{ color: "#1877f2" }} />
              </IconButton>
            </form>

            {/* ✅ عرض التعليقات */}
            {loadingComments ? (
              <Box sx={{ textAlign: "center", my: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : comments.length > 0 ? (
              comments.map((c: any) => (
                <Box key={c._id} sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Avatar
                    src={c.commentCreator.photo}
                    sx={{ width: 35, height: 35, cursor: "pointer" }}
                    onClick={() => handleNavigate(c.commentCreator._id)}
                  />
                  <Box
                    sx={{
                      bgcolor: "#f0f2f5",
                      p: 1.2,
                      borderRadius: "12px",
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 14,
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleNavigate(c.commentCreator._id)}
                    >
                      {c.commentCreator.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>{c.content}</Typography>
                    <Typography sx={{ fontSize: 11, color: "gray", mt: 0.5 }}>
                      {new Date(c.createdAt).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography sx={{ color: "gray", textAlign: "center", mt: 2 }}>
                No comments yet.
              </Typography>
            )}
          </Box>
        )}
      </Card>

      {/* ✅ Dialog لتعديل البوست */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Post content"
            multiline
            rows={4}
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />

          <Button variant="contained" component="label">
            {editImage ? editImage.name : "Upload new image"}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files?.[0] || null)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleUpdate(postObject._id)}
            disabled={loadingUpdate}
          >
            {loadingUpdate ? <CircularProgress size={20} /> : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}