import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./postCart";
import ViewPostApproveModal from "./modals/viewModal";
import { setPostProduct } from "../../../../redux/reducers/postReducer";
import postProductApi from "../../../../api/postProductApi";
import io from "socket.io-client";
import { host } from "../../../../api/axiosClient";

const socket = io(host);

const Approve = () => {
  const [loading, setLoading] = useState(false);
  const posts = useSelector((state) => state.post.all);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const posts = await postProductApi.gets();
        dispatch(setPostProduct(posts));
      } catch {
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, [dispatch]);

  useEffect(() => {
    socket.on("post-recieve", (data) => {
      console.log(data);
    });
  }, []);

  const pendingPosts = posts.filter(
    (post) => post.status_check_post === "pending"
  );

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {loading ? (
        <LinearProgress />
      ) : pendingPosts.length === 0 ? (
        <Typography>Không có bài duyệt</Typography>
      ) : (
        <>
          {pendingPosts.map((post, i) => (
            <PostCard post={post} key={i} />
          ))}
        </>
      )}
      <ViewPostApproveModal loading={loading} setLoading={setLoading} />
    </Box>
  );
};

export default Approve;
