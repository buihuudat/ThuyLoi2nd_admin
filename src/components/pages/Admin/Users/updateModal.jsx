import React, { useState } from "react";
import { Box, TextField, Button, Modal, Avatar } from "@mui/material";
import userApi from "../../../../api/userApi";
import Toast from "../../../common/Toast";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUpdateModal } from "../../../../redux/reducers/modalReducer";
import { setAllUser } from "../../../../redux/reducers/userReducer";

const UpdateModal = () => {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [msvErrText, setMsvErrText] = useState("");
  const [emailErrText, setEmailErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");
  const [phoneErrText, setPhoneErrText] = useState("");
  const [msv, setMsv] = useState("");

  const [selected, setSelected] = useState({});
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.adminUpdateModal);

  const data = {
    _id: modal.data._id,
    msv: msv || modal.data.msv,
    fullname: fullname || modal.data.fullname,
    password: password || modal.data.password,
    confirmPassword: confirmPassword || modal.data.password,
    email: email.toLowerCase() || modal.data.email,
    phone: phone || modal.data.phone,
    role: role || modal.data.role,
  };

  const handleEdit = () => {
    setDisable(!disable);
    setLoading(false);
  };
  const handleClose = () => {
    setEmailErrText("");
    setPhoneErrText("");
    setPasswordErrText("");
    setLoading(false);
    setDisable(true);
    setSelected([]);
    setSelected({});
    dispatch(setAdminUpdateModal({ type: false, data: {} }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (data.password !== data.confirmPassword) {
      setConfirmPasswordErrText("Password dont match");
      return;
    }
    setEmailErrText("");
    setPhoneErrText("");
    setPasswordErrText("");
    setSelected([]);

    try {
      await userApi.update(data);
      setDisable(true);
      setLoading(false);
      dispatch(setAdminUpdateModal({ type: false, data: {} }));
      Toast("success", "Edit successfully");
    } catch (error) {
      console.log(error);
      const errors = error.data.errors;
      errors.forEach((e) => {
        const { param, msg } = e;
        switch (param) {
          case "msv":
            setMsvErrText(msg);
            break;
          case "email":
            setEmailErrText(msg);
            break;
          case "phone":
            setPhoneErrText(msg);
            break;
          case "password":
            setPasswordErrText(msg);
            break;
          case "confirmPassword":
            setConfirmPasswordErrText(msg);
            break;
          default:
            break;
        }
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <Modal open={modal.type} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            margin: "1rem auto",
            width: "500px",
            padding: "1.5rem 3rem",
            borderRadius: "10px",
            textAlign: "center",
          }}
          onSubmit={handleSubmit}
          component="form"
          mt={1}
          noValidate
        >
          <Avatar
            src={modal.data.avatar}
            sx={{ width: 80, height: 80, margin: "1rem auto" }}
          />
          <h1 style={{ margin: "0 auto" }}>
            {modal?.data?.boss
              ? "Boss"
              : modal.data.role === 0
              ? "Admin"
              : "User"}{" "}
            {modal.data.fullname}
          </h1>
          <TextField
            variant="outlined"
            label="MSV"
            name="msv"
            id="msv"
            defaultValue={modal.data.msv}
            onChange={(e) => setMsv(e.target.value)}
            fullWidth
            margin="normal"
            disabled={disable}
            error={msvErrText !== ""}
            helperText={msvErrText}
          />
          <TextField
            variant="outlined"
            label="Fullname"
            name="fullname"
            id="fullname"
            defaultValue={modal.data.fullname}
            onChange={(e) => setFullname(e.target.value)}
            fullWidth
            margin="normal"
            disabled={disable}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            id="email"
            type={"email"}
            defaultValue={modal.data.email || ""}
            fullWidth
            margin="normal"
            disabled={disable}
            error={emailErrText !== ""}
            helperText={emailErrText}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="PhoneNumber"
            name="phone"
            id="phone"
            defaultValue={modal.data.phone}
            fullWidth
            margin="normal"
            disabled={disable}
            error={phoneErrText !== ""}
            helperText={phoneErrText}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Role"
            name="role"
            defaultValue={modal.data.role}
            fullWidth
            margin="normal"
            disabled={disable}
            onChange={(e) => setRole(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="password"
            name="password"
            id="password"
            defaultValue={""}
            fullWidth
            margin="normal"
            disabled={disable}
            error={passwordErrText !== ""}
            helperText={passwordErrText}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={disable ? { display: "none" } : {}}
            variant="outlined"
            label="ConfirmPassword"
            name="confirmPassword"
            id="confirmPassword"
            defaultValue={""}
            fullWidth
            margin="normal"
            error={confirmPasswordErrText !== ""}
            helperText={confirmPasswordErrText}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <LoadingButton
            sx={disable ? { display: "none" } : { mt: 2 }}
            fullWidth
            variant="outlined"
            type="submit"
            disabled={disable}
            loading={loading}
          >
            Save
          </LoadingButton>
          <Button
            fullWidth
            color={disable ? "secondary" : "warning"}
            variant="outlined"
            onClick={handleEdit}
            sx={{ mt: 1 }}
          >
            {disable ? "Edit" : "Cancel"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
