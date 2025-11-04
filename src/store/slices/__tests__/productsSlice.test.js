/* eslint-disable no-unused-vars */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  clearSelectedProduct,
} from "../productsSlice";
import * as api from "../../../services/api";

vi.mock("../../../services/api", () => ({
  getProducts: vi.fn(),
}));

describe("productsSlice", () => {
  let store;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  const initialState = {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    expect(productsReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle clearSelectedProduct", () => {
    const stateWithProduct = {
      ...initialState,
      selectedProduct: { id: "1", name: "Test Product" },
    };

    const actual = productsReducer(stateWithProduct, clearSelectedProduct());
    expect(actual.selectedProduct).toBeNull();
  });

  describe("fetchProducts async thunk", () => {
    it("should set loading to true when pending", () => {
      const action = { type: fetchProducts.pending.type };
      const state = productsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("should set products when fulfilled", () => {
      const products = [
        { id: "1", name: "Product 1", price: 10000 },
        { id: "2", name: "Product 2", price: 20000 },
      ];

      const action = {
        type: fetchProducts.fulfilled.type,
        payload: { data: products },
      };

      const state = productsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.items).toEqual({ data: products });
      expect(state.error).toBeNull();
    });

    it("should set error when rejected", () => {
      const errorMessage = "Failed to fetch products";
      const action = {
        type: fetchProducts.rejected.type,
        payload: errorMessage,
      };

      const state = productsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });

    it("should handle empty products array", () => {
      const action = {
        type: fetchProducts.fulfilled.type,
        payload: { data: [] },
      };

      const state = productsReducer(initialState, action);

      expect(state.items).toEqual({ data: [] });
      expect(state.loading).toBe(false);
    });
  });
});
