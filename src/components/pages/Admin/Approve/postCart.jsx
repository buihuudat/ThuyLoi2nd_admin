import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setApproveModal } from "../../../../redux/reducers/modalReducer";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const handleView = () => {
    dispatch(
      setApproveModal({
        data: post,
        type: true,
      })
    );
  };
  return (
    <Box p={2}>
      <Card sx={{ width: 200 }}>
        <CardMedia component="img" height="auto" image={post.images[0].url} />
        <CardContent>
          <Typography fontStyle={"italic"}>
            Updated: {moment(post.updatedAt).format("d/mm/yy")}
          </Typography>
          <Typography fontWeight={600} align="center">
            {post.title}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ fontSize: 10 }}
            onClick={handleView}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostCard;
