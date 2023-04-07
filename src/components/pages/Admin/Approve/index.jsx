import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import PostCard from "./postCart";
import ViewPostApproveModal from "./modals/viewModal";
import { setPostProduct } from "../../../../redux/reducers/postReducer";
import postProductApi from "../../../../api/postProductApi";

const Approve = () => {
  const [postsData, setPostsData] = useState([]);
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
    setPostsData(_.filter(posts, { status_check_post: "pending" }));
  }, [posts, loading]);

  return loading ? (
    <LinearProgress />
  ) : !postsData ? (
    <Typography>Không có bài duyệt</Typography>
  ) : (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {postsData?.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
      <ViewPostApproveModal loading={loading} setLoading={setLoading} />
    </Box>
  );
};

export default Approve;
