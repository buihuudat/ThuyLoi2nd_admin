import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import handlerReducer from "./reducers/handlerReducer";
import productReducer from "./reducers/productReducer";
import orderReducer from "./reducers/orderReducer";
import postReducer from "./reducers/postReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    handler: handlerReducer,
    products: productReducer,
    userOrder: orderReducer,

    post: postReducer,
  },
});

export default store;
