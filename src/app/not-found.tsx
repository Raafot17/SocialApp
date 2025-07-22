"use client";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        gap: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "5rem" }}>
        404
      </Typography>
      <Typography variant="h5">الصفحة غير موجودة</Typography>
      <Typography variant="body1" color="text.secondary">
        الرابط الذي أدخلته غير صحيح أو تم حذفه.
      </Typography>

      <Link href="/" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ mt: 2 }}>
          العودة إلى الرئيسية
        </Button>
      </Link>
    </Box>
  );
}
