import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import ProductsPage from "../ProductsPage";
import productsReducer from "../../../store/slices/productsSlice";
import cartReducer from "../../../store/slices/cartSlice";
import transactionReducer from "../../../store/slices/transactionSlice";

// Mock de funciones async
vi.mock("../../../utils/alertsCard", () => ({
  showInfoToast: vi.fn(),
}));

describe("ProductsPage", () => {
  it("should render without crashing", () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
        transaction: transactionReducer,
      },
      preloadedState: {
        products: {
          items: [],
          loading: false,
          error: null,
        },
        cart: { selectedProduct: null, quantity: 1 },
        transaction: {
          currentTransaction: null,
          loading: false,
          error: null,
          customerData: null,
          deliveryData: null,
          creditCardData: null,
          paymentResult: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductsPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Tienda Online")).toBeInTheDocument();
  });
});
