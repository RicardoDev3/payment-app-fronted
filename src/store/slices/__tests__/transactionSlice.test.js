/* eslint-disable no-unused-vars */

import { describe, it, expect, vi, beforeEach } from "vitest";
import transactionReducer, {
  setCustomerData,
  setDeliveryData,
  setCreditCardData,
  clearTransaction,
  restoreFromLocalStorage,
} from "../transactionSlice";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

window.localStorage = localStorageMock;

describe("transactionSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  const initialState = {
    currentTransaction: null,
    paymentResult: null,
    customerData: null,
    deliveryData: null,
    creditCardData: null,
    loading: false,
    error: null,
  };

  it("should return initial state", () => {
    expect(transactionReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  describe("setCustomerData", () => {
    it("should set customer data and save to localStorage", () => {
      const customerData = {
        fullName: "John Doe",
        email: "john@example.com",
        phoneNumber: "+573001234567",
      };

      const actual = transactionReducer(
        initialState,
        setCustomerData(customerData)
      );

      expect(actual.customerData).toEqual(customerData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "customerData",
        JSON.stringify(customerData)
      );
    });

    it("should handle empty customer data", () => {
      const actual = transactionReducer(initialState, setCustomerData({}));
      expect(actual.customerData).toEqual({});
    });
  });

  describe("setDeliveryData", () => {
    it("should set delivery data and save to localStorage", () => {
      const deliveryData = {
        street: "123 Main St",
        city: "Bogotá",
        state: "Cundinamarca",
        zipCode: "110111",
        country: "Colombia",
      };

      const actual = transactionReducer(
        initialState,
        setDeliveryData(deliveryData)
      );

      expect(actual.deliveryData).toEqual(deliveryData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "deliveryData",
        JSON.stringify(deliveryData)
      );
    });
  });

  describe("setCreditCardData", () => {
    it("should set credit card data WITHOUT saving to localStorage", () => {
      const cardData = {
        number: "4111111111111111",
        cardHolder: "JOHN DOE",
        expMonth: "12",
        expYear: "25",
        cvc: "123",
      };

      const actual = transactionReducer(
        initialState,
        setCreditCardData(cardData)
      );

      expect(actual.creditCardData).toEqual(cardData);

      expect(localStorageMock.setItem).not.toHaveBeenCalledWith(
        "creditCardData",
        expect.anything()
      );
    });

    it("should handle empty credit card data", () => {
      const actual = transactionReducer(initialState, setCreditCardData({}));
      expect(actual.creditCardData).toEqual({});
    });
  });

  describe("clearTransaction", () => {
    it("should reset all transaction data", () => {
      const stateWithData = {
        ...initialState,
        currentTransaction: { id: "123", status: "APPROVED" },
        customerData: { fullName: "John Doe" },
        deliveryData: { city: "Bogotá" },
        creditCardData: { number: "4111111111111111" },
        paymentResult: { status: "APPROVED" },
      };

      const actual = transactionReducer(stateWithData, clearTransaction());

      expect(actual).toEqual(initialState);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "currentTransaction"
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("customerData");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("deliveryData");
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("paymentResult");
    });

    it("should maintain initial state structure after clear", () => {
      const stateWithData = {
        ...initialState,
        customerData: { fullName: "Test" },
      };

      const actual = transactionReducer(stateWithData, clearTransaction());

      expect(actual.customerData).toBeNull();
      expect(actual.deliveryData).toBeNull();
      expect(actual.creditCardData).toBeNull();
    });
  });

  describe("restoreFromLocalStorage", () => {
    it("should restore data from localStorage", () => {
      const savedData = {
        currentTransaction: { id: "123", status: "PENDING" },
        customerData: { fullName: "John Doe", email: "john@test.com" },
        deliveryData: { city: "Bogotá", zipCode: "110111" },
      };

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "currentTransaction")
          return JSON.stringify(savedData.currentTransaction);
        if (key === "customerData")
          return JSON.stringify(savedData.customerData);
        if (key === "deliveryData")
          return JSON.stringify(savedData.deliveryData);
        return null;
      });

      const actual = transactionReducer(
        initialState,
        restoreFromLocalStorage()
      );

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        "currentTransaction"
      );
      expect(localStorageMock.getItem).toHaveBeenCalledWith("customerData");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("deliveryData");
    });

    it("should handle missing localStorage data gracefully", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const actual = transactionReducer(
        initialState,
        restoreFromLocalStorage()
      );

      expect(actual).toBeDefined();
      expect(actual.currentTransaction).toBeNull();
    });
  });

  describe("reducer edge cases", () => {
    it("should handle undefined state", () => {
      const result = transactionReducer(undefined, { type: "@@INIT" });
      expect(result).toEqual(initialState);
    });

    it("should not modify state on unknown action", () => {
      const state = { ...initialState, customerData: { name: "Test" } };
      const result = transactionReducer(state, { type: "UNKNOWN_ACTION" });
      expect(result).toEqual(state);
    });
  });
});
