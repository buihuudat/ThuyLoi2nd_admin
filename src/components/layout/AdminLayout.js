import { Box, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../pages/Admin/Sidebar";
import { useDispatch } from "react-redux";
import { setAllUser, setUser } from "../../redux/reducers/userReducer";

import authUtils from "../../utils/authUtils";
import postProductApi from "../../api/postProductApi";
import { setPostProduct } from "../../redux/reducers/postReducer";
import userApi from "../../api/userApi";

const AdminLayout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdmin = async () => {
      setLoading(true);
      try {
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

          const getUsers = async () => {
            const users = await userApi.gets();
            dispatch(setAllUser(users));
          };
          getUsers();
          getPosts();
          dispatch(setUser(user));
          setLoading(true);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [navigate, dispatch, loading]);

  return loading ? (
    <LinearProgress />
  ) : (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
