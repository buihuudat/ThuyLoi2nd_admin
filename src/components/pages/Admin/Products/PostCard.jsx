import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import currentFormat from "../../../../handler/currentFormat";
import { setUpdateModal } from "../../../../redux/reducers/modalReducer";
import productApi from "../../../../api/postProductApi";
import Toast from "../../../common/Toast";
import { setProducts } from "../../../../redux/reducers/productReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import userApi from "../../../../api/userApi";
import moment from "moment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { post_status } from "../../../../data";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const PostCard = ({ setLoadingSm, props }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [whoPost, setWhoPost] = useState("");
  const { role } = useSelector((state) => state.user.data);

  const handleDelete = async (e) => {
    setLoadingSm(true);
    try {
      const product = await productApi.delete(props._id);
      dispatch(setProducts(product));
      Toast("success", "Đã xóa thành công");
      setOpen(false);
      setLoadingSm(false);
    } catch (error) {
      Toast("error", "Xóa thất bại");
      setOpen(false);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user = await userApi.get({ _id: props.user });
      setWhoPost(user.fullname);
    };
    getUser();
  }, [props.user]);

  const handleEdit = (e) => {
    dispatch(setUpdateModal({ type: true, data: e }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Card sx={{ width: 180 }}>
        <Box
          display={"flex"}
          flexDirection="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography>
            <PermIdentityIcon />
            {whoPost}
          </Typography>
          <Typography fontWeight={600} fontStyle={"italic"}>
            {moment(props.createdAt).format("MMM Do YY")}
          </Typography>
        </Box>
        <CardContent>
          <CardMedia
            sx={{ width: "100%", height: "100px", objectFit: "fill" }}
            component="img"
            image={props.images[0].url}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 150,
              p: 0,
              pt: 3,
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              {props.title}
            </Typography>
            <Typography variant="body2" pt={1} pb={1}>
              {props.description}
            </Typography>
          </CardContent>
          <Box
            mt="auto"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight={600} color="orange">
              {currentFormat(props.price)}
            </Typography>
          </Box>
        </CardContent>
        {role === 0 && (
          <Box>
            <Typography align="center" fontWeight={600}>
              status: {post_status[props.status_check_post]}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                p: 1,
              }}
            >
              <IconButton onClick={() => setOpen(true)}>
                <DeleteIcon color="error" />
              </IconButton>
              <IconButton onClick={() => handleEdit(props)}>
                <RemoveRedEyeIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align="center" pb={3} variant="h5" fontWeight={600}>
            Bạn có chắc muốn xóa {props.name} ?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              color="primary"
              fullWidth
              variant="outlined"
            >
              Hủy
            </Button>
            <LoadingButton
              color="error"
              fullWidth
              variant="outlined"
              onClick={() => handleDelete(props)}
            >
              Xóa
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PostCard;
