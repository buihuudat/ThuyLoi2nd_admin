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

import FileBase64 from "react-file-base64";
import { setAddModal } from "../../../../../redux/reducers/modalReducer";
import Toast from "../../../../common/Toast";
import productApi from "../../../../../api/productApi";
import { useEffect } from "react";
import { setProducts } from "../../../../../redux/reducers/productReducer";
import imageUpload from "../../../../../handler/ImageUpload";
import { dataCateGories } from "../../../../../data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddModal() {
  const [value, setValue] = useState(0);
  const [images, setImages] = useState([]);
  const [nameErrText, setNameErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [priceErrText, setPriceErrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.addModal);

  useEffect(() => {
    const getAllProduct = async () => {
      // const products = await productApi.getAll();
      // dispatch(setProducts(products));
    };
    getAllProduct();
  }, [dispatch, loading]);

  const handleClose = () => {
    dispatch(setAddModal(false));
    setLoading(false);
    setValue(0);
    setImages([]);
    setNameErrText("");
    setDescErrText("");
    setPriceErrText("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const selectImages = (e) => {
    console.log(e);
    // e.map((img) => {
    //   console.log(img);
    //   setImages(...images, imageUpload(img.base64));
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      type: dataCateGories[formData.get("type")].type,
      name: formData.get("product_name"),
      description: formData.get("product_desc"),
      price: formData.get("product_price"),
      image: images,
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
    if (data.image === "") {
      err = true;
      alert("Hãy thêm ảnh cho sản phẩm");
    }

    if (err) return;
    setLoading(true);
    setValue(0);
    setImages("");
    setNameErrText("");
    setDescErrText("");
    setPriceErrText("");

    try {
      const createProduct = await productApi.create(data);
      Toast("success", `Đã thêm ${createProduct.name}`);
      setLoading(false);
      dispatch(setAddModal(false));
    } catch (error) {
      setLoading(false);
      Toast("error", "Thêm thất bại!!!...uhmm maybe đã có lỗi nào đó sảy ra");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component={"form"} onSubmit={handleSubmit}>
          <Typography pb={5} align="center" fontWeight={600} variant="h5">
            Đăng sản phẩm mới
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Loại sản phẩm</InputLabel>
            <Select
              value={value}
              label="Loại sản phẩm"
              name="type"
              onChange={handleChange}
            >
              {dataCateGories.map(({ title }, index) => (
                <MenuItem key={index} value={index}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            sx={{ mt: 3, display: "flex", flexDirection: "column" }}
          >
            {imgLoading &&
              images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={""}
                  style={{
                    width: "200px",
                  }}
                />
              ))}
            <FileBase64
              type={"file"}
              multiple={true}
              onDone={(e) => selectImages(e)}
            />
          </Button>
          <TextField
            fullWidth
            margin="normal"
            label="Tên sản phẩm"
            name="product_name"
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
            error={descErrText !== ""}
            helperText={descErrText}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Giá"
            name="product_price"
            type={"number"}
            error={priceErrText !== ""}
            helperText={priceErrText}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            type={"text"}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Số lượng"
            defaultValue={1000}
            name="count"
            type={"count"}
          />
          <LoadingButton
            fullWidth
            color="success"
            variant="outlined"
            sx={{ mt: 2 }}
            loading={loading}
            type={"submit"}
          >
            Thêm
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
