import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AdminLayout from "./components/layout/AdminLayout";

import Admin from "./components/pages/Admin";
import Products from "./components/pages/Admin/Products";
import Users from "./components/pages/Admin/Users";
import Login from "./components/pages/Login";
import Approve from "./components/pages/Admin/Approve";

const App = () => {
  const darkmode = 0;
  const theme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/" index element={<Admin />} />
            <Route path="/posts" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/approve" element={<Approve />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
