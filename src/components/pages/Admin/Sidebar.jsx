import * as React from "react";
import Box from "@mui/material/Box";
import _ from "lodash";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import FeedbackIcon from "@mui/icons-material/Feedback";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskIcon from "@mui/icons-material/Task";

import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Chip,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../../../assets/colors";
import { useSelector } from "react-redux";

const drawerWidth = 200;
const logo = require("../../../assets/images/logo.png");

export default function SideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [countOrder, setCountOrder] = useState(0);

  const whoami = useSelector((state) => state.user.data);

  const posts = useSelector((state) => state.post.all);
  const users = useSelector((state) => state.user.allUser);

  useEffect(() => {
    setCountOrder(_.filter(posts, { status_check_post: "pending" }).length);
  }, [posts]);

  const headerData = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      path: "/",
      noti: 0,
    },
    {
      icon: <FactCheckIcon />,
      text: "Posts",
      path: "/posts",
      noti: posts.length,
    },
    {
      icon: <TaskIcon />,
      text: "Approve",
      path: "/approve",
      noti: countOrder,
    },
    {
      icon: <AccountCircleOutlinedIcon />,
      text: "Users",
      path: "/users",
      noti: users.length,
    },
    {
      icon: <MessageIcon />,
      text: "Messages",
      path: "/message",
      // noti: users.length,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Avatar
          src={logo}
          sx={{
            ml: "auto",
            mr: "auto",
            mt: 2,
            mb: 2,
            width: 60,
            height: "auto",
          }}
        />
        <Divider />
        <Typography align="center" fontWeight={600}>
          {whoami.fullname}{" "}
          <Typography fontSize={12} color={colors.COLOR2} fontWeight={600}>
            {whoami.role === 0 ? "admin" : "saff"}
          </Typography>
        </Typography>
        <Divider />
        <List>
          {headerData.map((data, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={
                data.path === pathname
                  ? { background: colors.COLOR5, color: "white" }
                  : {}
              }
            >
              <ListItemButton to={data.path}>
                <ListItemIcon>{data.icon}</ListItemIcon>
                <ListItemText primary={data.text} />
                {data.noti !== 0 && (
                  <ListItemSecondaryAction>
                    <Chip label={data.noti} />
                  </ListItemSecondaryAction>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            mt: "auto",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon color={colors.COLOR1} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
