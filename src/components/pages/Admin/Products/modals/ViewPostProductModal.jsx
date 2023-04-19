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
import FileBase64 from "react-file-base64";
import { setUpdateModal } from "../../../../../redux/reducers/modalReducer";
import Toast from "../../../../common/Toast";
import productApi from "../../../../../api/postProductApi";
import { useEffect } from "react";
import { setProducts } from "../../../../../redux/reducers/productReducer";
import imageUpload from "../../../../../handler/ImageUpload";
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

export default function ViewPostProductModal() {
  const [images, setImages] = useState([]);
  const [nameErrText, setNameErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [priceErrText, setPriceErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const update = useSelector((state) => state.modal.updateModal);
  const type = _.findIndex(
    dataCateGories,
    (e) => {
      return e.type === update.data.category;
    },
    0
  );

  useEffect(() => {
    const getAllProduct = async () => {
      const products = await productApi.gets();
      dispatch(setProducts(products));
    };
    getAllProduct();
  }, [dispatch, loading]);

  const handleClose = () => {
    dispatch(setUpdateModal({ type: false, data: {} }));
    setLoading(false);
    setImages("");
    setNameErrText("");
    setDescErrText("");
    setPriceErrText("");
  };

  const handleChangeAvatar = async (e) => {
    setImages(await imageUpload(e.base64));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      _id: update.data._id,
      type: dataCateGories[formData.get("type")].type,
      name: formData.get("product_name"),
      description: formData.get("product_desc"),
      price: formData.get("product_price"),
      images: images || update.data.image,
    };
    let err = false;
    if (data.name === "") {
      err = true;
      setNameErrText("Vui lòng nhập tên sản phẩm");
    }
    if (data.description === "") {
      err = true;
      setDescErrText("Vui lòng nhập nội dung sản phẩm");
    }
    if (data.price === "") {
      err = true;
      setPriceErrText("Vui lòng nhập giá sản phẩm");
    }
    if (data.images.length < 1) {
      err = true;
      alert("Hãy thêm ảnh cho sản phẩm");
    }

    if (err) return;
    setLoading(true);
    setNameErrText("");
    setDescErrText("");
    setPriceErrText("");

    try {
      const updateProduct = await productApi.update(data);
      Toast("success", `Đã cập nhật ${updateProduct.name}`);
      setLoading(false);
      dispatch(setUpdateModal({ type: false, data: {} }));
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
            <Select label="Loại sản phẩm" name="type" defaultValue={type}>
              {dataCateGories.map(({ title }, index) => (
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
                alt="img"
                style={{
                  width: "200px",
                }}
              />
            ))}
          </Box>
          <Button
            fullWidth
            sx={{ mt: 3, display: "flex", flexDirection: "column" }}
          >
            <FileBase64
              type={"file"}
              multiple={false}
              onDone={(e) => handleChangeAvatar(e)}
            />
          </Button>
          <TextField
            fullWidth
            margin="normal"
            label="Tiêu đề"
            name="product_name"
            defaultValue={update.data.title}
            error={nameErrText !== ""}
            helperText={nameErrText}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="normal"
            label="Mô tả"
            name="product_desc"
            defaultValue={update.data.description}
            error={descErrText !== ""}
            helperText={descErrText}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Giá"
            name="product_price"
            type={"number"}
            defaultValue={update.data.price}
            error={priceErrText !== ""}
            helperText={priceErrText}
          />
          <LoadingButton
            fullWidth
            color="success"
            variant="outlined"
            sx={{ mt: 2 }}
            loading={loading}
            type={"submit"}
          >
            Cập nhật
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
