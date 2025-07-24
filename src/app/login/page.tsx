"use client"
import { userLogin } from '@/lib/authSlice'
import { store } from '@/lib/store'
import { Button, Container, Paper, TextField, Typography, Link, Box } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

export default function Login() {
  let router = useRouter();
  let dispatch = useDispatch<typeof store.dispatch>();

  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(userLogin(values))
        .then((res) => {
          if (res.payload.message == "success") {
            localStorage.setItem("token", res.payload.token);
            router.push("/");
          } else {
            toast.error(res.payload)
          }
        })
        .catch((err) => {
          console.log("err", err);
        })
    },
  });

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
          elevation={0}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "#ffffff", fontWeight: "bold", mb: 3, letterSpacing: 1 }}
          >
            Welcome Back
          </Typography>

          <form
            onSubmit={Formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              value={Formik.values.email}
              onChange={Formik.handleChange}
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              InputLabelProps={{ style: { color: "#ddd" } }}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              value={Formik.values.password}
              onChange={Formik.handleChange}
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              InputLabelProps={{ style: { color: "#ddd" } }}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <Button
              type="submit"
              sx={{
                background: "linear-gradient(90deg,#2193b0,#6dd5ed)",
                color: "white",
                width: "70%",
                margin: "auto",
                padding: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "30px",
                transition: "0.3s",
                ":hover": {
                  background: "linear-gradient(90deg,#6dd5ed,#2193b0)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              Login
            </Button>
          </form>

          {/* Links Section */}
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 14,
              color: "#eee",
            }}
          >
            <Typography>
              Don't have an account?{" "}
              <Link
                href="/register"
                underline="hover"
                sx={{ cursor: "pointer", color: "#6dd5ed", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </Typography>

            <Typography>
              <Link
                href="/forgot-password"
                underline="hover"
                sx={{ cursor: "pointer", color: "#6dd5ed", fontWeight: "bold" }}
              >
                Forgot password?
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
