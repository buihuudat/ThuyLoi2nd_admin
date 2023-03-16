import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

import FileBase64 from "react-file-base64";
import { setAddModal } from "../../../../../redux/reducers/modalReducer";
import Toast from "../../../../common/Toast";
import postProductApi from "../../../../../api/postProductApi";
import { useEffect } from "react";
import { setProducts } from "../../../../../redux/reducers/productReducer";
import { dataCateGories } from "../../../../../data";
import proviceApi from "../../../../../api/proviceAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 900,
  maxHeight: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddModal({ setLoadingSm }) {
  const [value, setValue] = useState(0);
  const [images, setImages] = useState([]);
  const [nameErrText, setNameErrText] = useState("");
  const [descErrText, setDescErrText] = useState("");
  const [priceErrText, setPriceErrText] = useState("");
  const [loading, setLoading] = useState(false);

  const [provice, setProvice] = useState([]);
  const [city, setCity] = useState(49);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(0);

  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.addModal);
  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    const getProvice = async () => {
      const data = await proviceApi.get();
      setProvice(data);
    };
    getProvice();
  }, []);
  useEffect(() => {
    const getAllProduct = async () => {
      const products = await postProductApi.gets();
      dispatch(setProducts(products));
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

  // get districts
  useEffect(() => {
    const districts = () => {
      provice?.forEach((data, index) => {
        if (index === city) {
          setDistricts(data.districts);
        }
      });
    };
    districts();
  }, [city, provice]);

  const selectImages = async (e) => {
    e.map(async (img) => {
      setImages((prevImg) => [...prevImg, { url: img.base64 }]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      user: user._id,
      category: dataCateGories[formData.get("type")].type,
      title: formData.get("product_name"),
      description: formData.get("product_desc"),
      price: +formData.get("product_price"),
      // images: imageUpload(images),
      images,
      location: {
        city: provice[city].name,
        district: districts[district].name,
      },
    };

    if (data.price < 1000) {
      setPriceErrText("Giá không hợp lệ");
      return;
    }

    setLoading(true);
    setLoadingSm(true);
    setValue(0);
    setImages("");
    setNameErrText("");
    setDescErrText("");
    setPriceErrText("");

    try {
      const createProduct = await postProductApi.create(data);
      Toast("success", `Đã thêm ${createProduct.title}`);
      setLoading(false);
      dispatch(setAddModal(false));
      setLoadingSm(false);
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
            Đăng mặt hàng mới
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Loại hàng</InputLabel>
            <Select
              value={value}
              label="Loại hàng"
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
          <Box display="flex" flexDirection="row" p={3} gap={3}>
            {images &&
              images.map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt={""}
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
              multiple={true}
              onDone={(e) => selectImages(e)}
            />
          </Button>
          <TextField
            fullWidth
            margin="normal"
            label="Tiêu đề"
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
          <Grid pt={4} container spacing={3} justifyContent="space-between">
            <Grid item xs={4}>
              <FormControl>
                <InputLabel>Thành phố</InputLabel>
                <Select
                  label="Thành phố"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {provice.map((data, index) => (
                    <MenuItem key={index} value={index}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Quận/Huyện</InputLabel>
                <Select
                  label="Quận/Huyện"
                  name="district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {districts.map((data, index) => (
                    <MenuItem key={index} value={index}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
