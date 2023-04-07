import React from "react";
import _ from "lodash";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { useSelector } from "react-redux";
import { ColumnChart } from "../../columnChart";
import { PieChart } from "../../pieChart";

const dataInfo = [
  {
    icon: <GroupIcon sx={{ width: 60, height: 60 }} />,
    title: "Users",
    count: 0,
  },
  {
    icon: <Inventory2Icon sx={{ width: 60, height: 60 }} />,
    title: "Posts",
    count: 0,
  },
  {
    icon: <AddTaskIcon sx={{ width: 60, height: 60 }} />,
    title: "Approve",
    count: 0,
  },
  // {
  //   icon: <SellIcon sx={{ width: 60, height: 60 }} />,
  //   title: "Total Sell",
  //   count: 0,
  // },
];
const Information = () => (
  <Box>
    <Grid container spacing={3} justifyContent="center">
      {dataInfo.map((data, index) => (
        <Grid key={index} item xs={3}>
          <Paper
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              m: "0 auto",
              mt: 4,
              p: 2,
            }}
          >
            {data.icon}
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box>
              <Typography align="center">{data.title}</Typography>
              <Typography
                align="center"
                color="orange"
                fontWeight={600}
                variant={"h5"}
              >
                {data.count}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const Admin = () => {
  const usersRedux = useSelector((state) => state.user.allUser);
  const posts = useSelector((state) => state.post.all);
  const users = (arr, key, value) =>
    _.filter(arr, {
      [key]: value,
    });
  dataInfo[0].count = users(usersRedux, "permission", 1).length;
  dataInfo[1].count = posts.length;
  dataInfo[2].count = _.filter(posts, { status_check_post: "pending" }).length;

  return (
    <Box>
      <Information />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <ColumnChart />
        <PieChart />
      </Box>
    </Box>
  );
};

export default Admin;
