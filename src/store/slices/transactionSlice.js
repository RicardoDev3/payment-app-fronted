import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTransaction as createTransactionAPI,
  processPayment as processPaymentAPI,
  getTransaction as getTransactionAPI,
} from "../../services/api";
import {
  showTransactionCreatedAlert,
  showPaymentSuccessAlert,
  showPaymentDeclinedAlert,
} from "../../utils/alertsCard";

// Thunk para crear transacción
export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await createTransactionAPI(transactionData);

      // Guardar en localStorage para recuperación
      localStorage.setItem("currentTransaction", JSON.stringify(response.data));

      await showTransactionCreatedAlert();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk para procesar pago
export const processPayment = createAsyncThunk(
  "transaction/processPayment",
  async ({ transactionId, creditCard }, { rejectWithValue }) => {
    try {
      const response = await processPaymentAPI(transactionId, creditCard);

      const paymentData = response.data;

      // Guardar resultado en localStorage
      localStorage.setItem("paymentResult", JSON.stringify(paymentData));

      if (paymentData.status === "APPROVED") {
        await showPaymentSuccessAlert(paymentData.transaction);
      } else if (paymentData.status === "DECLINED") {
        await showPaymentDeclinedAlert(paymentData.message);
      }

      return paymentData;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk para obtener transacción
export const fetchTransaction = createAsyncThunk(
  "transaction/fetch",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await getTransactionAPI(transactionId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    currentTransaction: null,
    paymentResult: null,
    customerData: null,
    deliveryData: null,
    creditCardData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
      // Guardar en localStorage
      localStorage.setItem("customerData", JSON.stringify(action.payload));
    },
    setDeliveryData: (state, action) => {
      state.deliveryData = action.payload;
      // Guardar en localStorage
      localStorage.setItem("deliveryData", JSON.stringify(action.payload));
    },
    setCreditCardData: (state, action) => {
      state.creditCardData = action.payload;
      // NO guardar tarjeta en localStorage por seguridad
    },
    clearTransaction: (state) => {
      state.currentTransaction = null;
      state.paymentResult = null;
      state.customerData = null;
      state.deliveryData = null;
      state.creditCardData = null;
      state.error = null;

      // Limpiar localStorage
      localStorage.removeItem("currentTransaction");
      localStorage.removeItem("paymentResult");
      localStorage.removeItem("customerData");
      localStorage.removeItem("deliveryData");
    },
    restoreFromLocalStorage: (state) => {
      // Restaurar datos de localStorage
      const savedTransaction = localStorage.getItem("currentTransaction");
      const savedCustomer = localStorage.getItem("customerData");
      const savedDelivery = localStorage.getItem("deliveryData");
      const savedPayment = localStorage.getItem("paymentResult");

      if (savedTransaction) {
        state.currentTransaction = JSON.parse(savedTransaction);
      }
      if (savedCustomer) {
        state.customerData = JSON.parse(savedCustomer);
      }
      if (savedDelivery) {
        state.deliveryData = JSON.parse(savedDelivery);
      }
      if (savedPayment) {
        state.paymentResult = JSON.parse(savedPayment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload.transaction;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentResult = action.payload;
        state.currentTransaction = action.payload.transaction;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch transaction
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload.transaction;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCustomerData,
  setDeliveryData,
  setCreditCardData,
  clearTransaction,
  restoreFromLocalStorage,
} = transactionSlice.actions;

export default transactionSlice.reducer;
