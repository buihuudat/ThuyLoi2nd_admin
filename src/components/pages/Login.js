import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

const logo = require("../../assets/images/logos/Logo-Thuy_Loi.png");

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [phoneErrText, setPhoneErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      phone: formData.get("phone"),
      password: formData.get("password"),
    };
    // handle check err
    // let err = false;
    // if (err) return;

    setPhoneErrText("");
    setPasswordErrText("");
    setLoading(true);
    try {
      const { token } = await authApi.login(data);
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/");
    } catch (e) {
      setLoading(false);
      const errors = e?.data?.errors;
      errors?.forEach((e) => {
        if (e.param === "phone") {
          setPhoneErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
      });
    }
  };
  return (
    <Box
      sx={{
        displayL: "flex",
        flexDirection: "row",
        justifyContent: "center",
        height: "100vh",
        pt: 6,
      }}
    >
      <Avatar
        src={logo}
        sx={{
          width: 120,
          height: "auto",
          objectFit: "cover",
          m: 5,
          ml: "auto",
          mr: "auto",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Paper sx={{ p: 6 }}>
          <Typography align="center" pb={5} fontWeight={600} fontSize={30}>
            ADMIN LOGIN
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              gap: 3,
              flexDirection: "column",
              width: 400,
            }}
          >
            <TextField
              required
              label="Phone"
              name="phone"
              error={phoneErrText !== ""}
              helperText={phoneErrText}
            />
            <TextField
              required
              label="Password"
              name="password"
              type={"password"}
              error={passwordErrText !== ""}
              helperText={passwordErrText}
            />
            <LoadingButton loading={loading} variant="contained" type="submit">
              Login
            </LoadingButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
