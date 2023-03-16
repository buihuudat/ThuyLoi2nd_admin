import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import PostCard from "./postCart";
import ViewPostApproveModal from "./modals/viewModal";
import { setPostProduct } from "../../../../redux/reducers/postReducer";
import postProductApi from "../../../../api/postProductApi";

const Approve = () => {
  const [postsData, setPostsData] = useState([]);
  const posts = useSelector((state) => state.post.all);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await postProductApi.gets();
      dispatch(setPostProduct(posts));
    };
    getPosts();
  }, [dispatch]);

  useEffect(() => {
    setPostsData(_.filter(posts, { status_check_post: "pending" }));
  }, [posts]);

  return !postsData ? (
    <Typography>Không có bài duyệt</Typography>
  ) : (
    <Box>
      {postsData?.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
      <ViewPostApproveModal />
    </Box>
  );
};

export default Approve;
