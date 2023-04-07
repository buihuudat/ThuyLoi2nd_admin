import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

import _ from "lodash";
import { setApproveModal } from "../../../../../redux/reducers/modalReducer";
import Toast from "../../../../common/Toast";
import productApi from "../../../../../api/postProductApi";
import { dataCateGories } from "../../../../../data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 900,
  maxHeight: 800,
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ViewPostApproveModal({ loading, setLoading }) {
  const [submit, setSubmit] = useState("pending");

  const dispatch = useDispatch();
  const update = useSelector((state) => state.modal.approveModal);
  const type = _.findIndex(
    dataCateGories,
    (e) => {
      return e.type === update.data.category;
    },
    0
  );

  const handleClose = () => {
    dispatch(setApproveModal({ type: false, data: {} }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...update.data,
      status_check_post: submit,
    };

    try {
      const updateProduct = await productApi.statusUpdate(data);
      Toast("success", `Đã cập nhật ${updateProduct.title}`);
      setLoading(false);
      dispatch(setApproveModal({ type: false, data: {} }));
    } catch (error) {
      setLoading(false);
      Toast(
        "error",
        "Cập nhật thất bại!!!...uhmm maybe đã có lỗi nào đó sảy ra"
      );
    }
  };

  return (
    <div>
      <Modal
        open={update.type}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography pb={5} align="center" fontWeight={600} variant="h5">
            Thông tin sản phẩm
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Loại sản phẩm</InputLabel>
            <Select
              disabled
              label="Loại sản phẩm"
              name="type"
              defaultValue={type}
            >
              {dataCateGories.map(({ title }, index = 0) => (
                <MenuItem key={index} value={index}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display={"flex"} flexDirection="row" gap={5} mt={4}>
            {update?.data?.images?.map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt="images"
                style={{
                  width: "200px",
                }}
              />
            ))}
          </Box>

          <TextField
            fullWidth
            margin="normal"
            label="Tiêu đề"
            name="product_name"
            defaultValue={update.data.title}
            disabled
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Mô tả"
            name="product_desc"
            defaultValue={update.data.description}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Giá"
            name="product_price"
            type={"number"}
            defaultValue={update.data.price}
            disabled
          />
          <Box>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              type="submit"
              onClick={() => setSubmit("refuse")}
            >
              Refuse
            </Button>
            <LoadingButton
              fullWidth
              color="success"
              variant="outlined"
              sx={{ mt: 2 }}
              loading={loading}
              type={"submit"}
              onClick={() => setSubmit("access")}
            >
              Access
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
