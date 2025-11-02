import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    transaction: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["transaction/setTransactionData"],
      },
    }),
});
