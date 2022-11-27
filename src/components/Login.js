import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

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
import Spinner from "react-bootstrap/Spinner";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);

    let res = await axios.post(`${url}/auth/signin`, {
      email,
      password,
    });
    // console.log(res.data);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      navigate("/home");
    } else {
      toast.error(res.data.message);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          className="d-flex flex-column align-items-center"
          sx={{
            marginTop: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            className=""
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <button
                  className="direct"
                  onClick={() => navigate("/forgot_password")}
                  variant="body2"
                >
                  Forgot password?
                </button>
              </Grid>
              <Grid item>
                <button
                  className="direct"
                  onClick={() => navigate("/signup")}
                  variant="body2"
                >
                  {"Don't have an account?"}
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
