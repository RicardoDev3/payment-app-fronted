/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  showErrorAlert,
  showNetworkErrorAlert,
  showLoadingAlert,
  closeLoadingAlert,
} from "../utils/alertsCard";

// Configuración base de Axios
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requests (opcional)
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar tokens de autenticación si los necesitas
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de responses para manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Error de red
    if (!error.response) {
      showNetworkErrorAlert();
      return Promise.reject(error);
    }

    // Manejar diferentes códigos de error
    const status = error.response.status;
    const errorMessage = error.response.data?.message || error.message;

    switch (status) {
      case 400:
        // Bad Request - mostrar mensaje específico
        break;
      case 404:
        showErrorAlert("No encontrado", "El recurso solicitado no existe");
        break;
      case 500:
        showErrorAlert(
          "Error del servidor",
          "Ocurrió un error en el servidor. Intenta más tarde."
        );
        break;
      default:
        break;
    }

    return Promise.reject(error);
  }
);

// ============================================
// PRODUCTOS
// ============================================

/**
 * Obtener todos los productos
 */
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Obtener un producto por ID
 */
export const getProductById = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// ============================================
// TRANSACCIONES
// ============================================

/**
 * Crear una transacción
 */
export const createTransaction = async (transactionData) => {
  try {
    showLoadingAlert("Creando transacción...");
    const response = await api.post("/transactions", transactionData);
    closeLoadingAlert();
    return response.data;
  } catch (error) {
    closeLoadingAlert();
    console.error("Error creating transaction:", error);

    const errorMessage =
      error.response?.data?.message || "Error al crear la transacción";
    showErrorAlert("Error", errorMessage);

    throw error;
  }
};

/**
 * Procesar pago de una transacción
 */
export const processPayment = async (transactionId, creditCardData) => {
  try {
    showLoadingAlert("Procesando pago...");
    const response = await api.post(
      `/transactions/${transactionId}/process-payment`,
      {
        creditCard: creditCardData,
      }
    );
    closeLoadingAlert();
    return response.data;
  } catch (error) {
    closeLoadingAlert();
    console.error("Error processing payment:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Error al procesar el pago";

    showErrorAlert("Pago Fallido", errorMessage);

    throw error;
  }
};

/**
 * Obtener detalles de una transacción
 */
export const getTransaction = async (transactionId) => {
  try {
    const response = await api.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
};

export default api;
