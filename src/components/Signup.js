import React, { useState } from "react";
import { url } from "../App";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const theme = createTheme();

const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};

    if (!values.userName) {
      errors.userName = "Required";
    } else if (values.userName.length < 6) {
      errors.userName = "Minimum 6 characters required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email";
    }

    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  // const userSchema = yup.object().shape({
  //   userName: yup.string().min(6).required("Required"),
  //   email: yup.string().email("Invalid Email Format").required("Required"),
  //   password: yup.string().min(8).required("Required"),
  // })

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      let res = await axios.post(`${url}/auth/signup`, {
        userName: values.userName,
        email: values.email,
        password: values.password,
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.message);
        formik.resetForm();
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
    },
  });
  // tODO : Implement: Username input field validation needs to be done before submitting the form.

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              value={formik.values.userName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {/* {formik.touched.userName && formik.errors.userName ? (
              <span style={styles.span}>{formik.errors.userName}</span>
            ) : null} */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              values={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Register"
              )}
            </Button>

            <Grid container>
              <Grid item>
                <button
                  className="direct"
                  onClick={() => navigate("/login")}
                  variant="body2"
                >
                  {"Already have an account? Sign In"}
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
