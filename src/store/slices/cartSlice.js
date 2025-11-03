import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    selectedProduct: null,
    quantity: 1,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.quantity = 1;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    clearCart: (state) => {
      state.selectedProduct = null;
      state.quantity = 1;
    },
  },
});

export const { setSelectedProduct, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
