"use client";
import { Regester, userLogin } from "@/lib/authSlice";
import { store } from "@/lib/store";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Link,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function Register() {
  let router = useRouter();
  let dispatch = useDispatch<typeof store.dispatch>();

  let Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
   onSubmit: (values) => {

  dispatch(Regester(values))
  
    .then((res) => {

      if (res.payload.message === "success") {
        router.push("login");
      } else {
        toast.error(res.payload || "Signup Failed!");
      }
    })
    .catch((err) => {
      toast.error("Signup failed!");
    });
},


  });

 
  return (
    <Box
      sx={{
      
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
            Create Account
          </Typography>

          <form
            onSubmit={Formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              value={Formik.values.name}
              onChange={Formik.handleChange}
              name="name"
              id="name"
              label="Full Name"
              variant="outlined"
              required
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              value={Formik.values.email}
              onChange={Formik.handleChange}
              type="email"
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              required
              InputLabelProps={{ style: { color: "gray" } }}
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
              type="password"
              name="password"
              id="password"
              label="Password"
              variant="outlined"
              required
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              value={Formik.values.rePassword}
              onChange={Formik.handleChange}
              type="password"
              name="rePassword"
              id="rePassword"
              label="Confirm Password"
              variant="outlined"
              required
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              value={Formik.values.dateOfBirth}
              onChange={Formik.handleChange}
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              variant="outlined"
              InputLabelProps={{ shrink: true, style: { color: "gray" } }}
              required
              InputProps={{
                style: {
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                },
              }}
            />

            <FormControl variant="outlined" required>
              <InputLabel id="gender-label" style={{ color: "gray" }}>Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={Formik.values.gender}
                onChange={Formik.handleChange}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

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
              Register
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
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "#6dd5ed", fontWeight: "bold" }}
              >
                Login
              </Link>
            </Typography>

           
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}




