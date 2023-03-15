import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../pages/Admin/Sidebar";
import { setProducts } from "../../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { setAllUser, setUser } from "../../redux/reducers/userReducer";

import userApi from "../../api/userApi";
import authUtils from "../../utils/authUtils";

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await authUtils.isAuthenticated();
      if (user.role !== 0) {
        alert("Use are not administrator");
        setLoading(false);
        navigate("/login");
      } else {
        const posts = await dispatch(setUser(user));
        setLoading(true);
      }
    };
    checkAdmin();
  }, [navigate, dispatch, loading]);

  return (
    loading && (
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    )
  );
};

export default AdminLayout;
