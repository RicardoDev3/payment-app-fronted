import Swal from "sweetalert2";

// Configuración base de SweetAlert2
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// Alerta de éxito
export const showSuccessAlert = (title, text) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#6366f1",
    confirmButtonText: "Aceptar",
  });
};

// Alerta de error
export const showErrorAlert = (title, text) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: text,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Aceptar",
  });
};

// Alerta de advertencia
export const showWarningAlert = (title, text) => {
  return Swal.fire({
    icon: "warning",
    title: title,
    text: text,
    confirmButtonColor: "#f59e0b",
    confirmButtonText: "Aceptar",
  });
};

// Alerta de información
export const showInfoAlert = (title, text) => {
  return Swal.fire({
    icon: "info",
    title: title,
    text: text,
    confirmButtonColor: "#6366f1",
    confirmButtonText: "Aceptar",
  });
};

// Toast de éxito (pequeña notificación)
export const showSuccessToast = (message) => {
  return Toast.fire({
    icon: "success",
    title: message,
  });
};

// Toast de error
export const showErrorToast = (message) => {
  return Toast.fire({
    icon: "error",
    title: message,
  });
};

// Toast de información
export const showInfoToast = (message) => {
  return Toast.fire({
    icon: "info",
    title: message,
  });
};

// Alerta de confirmación
export const showConfirmAlert = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#6366f1",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  });
};

// Alerta de loading
export const showLoadingAlert = (title = "Procesando...") => {
  return Swal.fire({
    title: title,
    html: "Por favor espera",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// Cerrar alerta de loading
export const closeLoadingAlert = () => {
  Swal.close();
};

// Alerta de pago exitoso con animación
export const showPaymentSuccessAlert = (transactionData) => {
  return Swal.fire({
    icon: "success",
    title: "¡Pago Exitoso!",
    html: `
      <div style="text-align: left; padding: 20px;">
        <p style="margin: 10px 0;"><strong>ID de Transacción:</strong> ${
          transactionData.id
        }</p>
        <p style="margin: 10px 0;"><strong>Monto Total:</strong> $${(
          transactionData.totalAmount / 100
        ).toLocaleString("es-CO")}</p>
        <p style="margin: 10px 0;"><strong>Estado:</strong> <span style="color: #10b981;">APROBADO</span></p>
        ${
          transactionData.wompiTransactionId
            ? `<p style="margin: 10px 0;"><strong>ID Wompi:</strong> ${transactionData.wompiTransactionId}</p>`
            : ""
        }
      </div>
    `,
    confirmButtonColor: "#6366f1",
    confirmButtonText: "Ver productos",
    width: 600,
  });
};

// Alerta de pago rechazado
export const showPaymentDeclinedAlert = (reason) => {
  return Swal.fire({
    icon: "error",
    title: "Pago Rechazado",
    html: `
      <div style="text-align: center; padding: 20px;">
        <p style="margin: 10px 0; font-size: 1.1rem;">Tu pago no pudo ser procesado</p>
        <p style="margin: 10px 0; color: #6b7280;">${
          reason || "Intenta con otro método de pago"
        }</p>
      </div>
    `,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Intentar de nuevo",
    width: 600,
  });
};

// Alerta de stock insuficiente
export const showInsufficientStockAlert = (available, requested) => {
  return Swal.fire({
    icon: "warning",
    title: "Stock Insuficiente",
    html: `
      <div style="text-align: center; padding: 20px;">
        <p style="margin: 10px 0;">Solo hay <strong>${available}</strong> unidades disponibles</p>
        <p style="margin: 10px 0; color: #6b7280;">Solicitaste: ${requested} unidades</p>
      </div>
    `,
    confirmButtonColor: "#f59e0b",
    confirmButtonText: "Entendido",
  });
};

// Alerta de producto agregado al carrito
export const showAddedToCartAlert = (productName) => {
  return Toast.fire({
    icon: "success",
    title: `${productName} agregado al carrito`,
  });
};

// Alerta de transacción creada
export const showTransactionCreatedAlert = () => {
  return Swal.fire({
    icon: "success",
    title: "Transacción Creada",
    text: "Ahora procederemos con el pago",
    timer: 2000,
    showConfirmButton: false,
  });
};

// Alerta de error de red
export const showNetworkErrorAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "Error de Conexión",
    text: "No se pudo conectar con el servidor. Por favor verifica tu conexión a internet.",
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Reintentar",
  });
};

// Alerta personalizada para validación de tarjeta
export const showCardValidationAlert = (errors) => {
  const errorList = errors
    .map((error) => `<li style="text-align: left;">${error}</li>`)
    .join("");

  return Swal.fire({
    icon: "warning",
    title: "Datos de Tarjeta Inválidos",
    html: `
      <div style="padding: 10px;">
        <p style="margin-bottom: 10px;">Por favor corrige los siguientes errores:</p>
        <ul style="text-align: left; padding-left: 20px;">
          ${errorList}
        </ul>
      </div>
    `,
    confirmButtonColor: "#f59e0b",
    confirmButtonText: "Corregir",
  });
};
