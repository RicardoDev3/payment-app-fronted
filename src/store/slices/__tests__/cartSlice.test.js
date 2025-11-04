import { describe, it, expect } from "vitest";
import cartReducer, {
  setSelectedProduct,
  setQuantity,
  clearCart,
} from "../cartSlice";

describe("cartSlice", () => {
  const initialState = {
    selectedProduct: null,
    quantity: 1,
  };

  it("should return initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSelectedProduct", () => {
    const product = {
      id: "1",
      name: "Test Product",
      price: 10000,
      stock: 5,
      imageUrl: "test.jpg",
      description: "Test description",
    };

    const actual = cartReducer(initialState, setSelectedProduct(product));

    expect(actual.selectedProduct).toEqual(product);
    expect(actual.quantity).toBe(1);
  });

  it("should handle setQuantity", () => {
    const actual = cartReducer(initialState, setQuantity(3));
    expect(actual.quantity).toBe(3);
  });

  it("should handle clearCart", () => {
    const stateWithProduct = {
      selectedProduct: {
        id: "1",
        name: "Test",
        price: 10000,
      },
      quantity: 5,
    };

    const actual = cartReducer(stateWithProduct, clearCart());

    expect(actual.selectedProduct).toBeNull();
    expect(actual.quantity).toBe(1);
  });

  it("should reset quantity when setting new product", () => {
    const stateWithProduct = {
      selectedProduct: { id: "1", name: "Product 1" },
      quantity: 5,
    };

    const newProduct = {
      id: "2",
      name: "Product 2",
      price: 20000,
    };

    const actual = cartReducer(
      stateWithProduct,
      setSelectedProduct(newProduct)
    );

    expect(actual.selectedProduct).toEqual(newProduct);
    expect(actual.quantity).toBe(1); // Should reset to 1
  });
});
