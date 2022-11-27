import React, { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { url } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function Login() {
  const [password, setPassword] = useState("");
  const [cf_password, setCf_password] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(password, cf_password);
    setLoading(true);
    if (password !== "" && cf_password !== "") {
      if (password === cf_password) {
        if (password.length > 8) {
          let res = await axios.post(
            `${url}/auth/reset`,
            { password: password },
            { headers: { Authorization: token } }
          );
          if (res.data.statusCode === 200) {
            navigate("/login");
            alert("Password changed successfully!!");
          } else {
            toast.error(res.data.message);
          }
        } else {
          toast.error("Password must be at least 8 characters");
        }
      } else {
        toast.error("Both Passwords should match");
      }
    } else {
      toast.error("Passwords should not be empty");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h5">
              Reset Password!!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cf_password"
                label="Confirm Password"
                name="cf_password"
                type="password"
                onChange={(e) => setCf_password(e.target.value)}
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
                  "Submit"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
