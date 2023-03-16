import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../pages/Admin/Sidebar";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

import authUtils from "../../utils/authUtils";
import postProductApi from "../../api/postProductApi";
import { setPostProduct } from "../../redux/reducers/postReducer";

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
        const getPosts = async () => {
          const posts = await postProductApi.gets();
          dispatch(setPostProduct(posts));
        };
        getPosts();
        dispatch(setUser(user));
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
