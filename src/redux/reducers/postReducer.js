import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  all: [],
};

export const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostProduct: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { setPostProduct } = postReducer.actions;
export default postReducer.reducer;
