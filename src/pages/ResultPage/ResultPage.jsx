import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import {
  fetchTransaction,
  clearTransaction,
} from "../../store/slices/transactionSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PrintIcon from "@mui/icons-material/Print";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./ResultPage.module.css";
import { formatCurrency } from "../../utils/formatters";

const ResultPage = () => {
  const { transactionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentTransaction, loading } = useSelector(
    (state) => state.transaction
  );

  console.log(currentTransaction);
  

  useEffect(() => {
    if (transactionId) {
      dispatch(fetchTransaction(transactionId));
    }
  }, [transactionId, dispatch]);

  const handleNewPurchase = () => {
    dispatch(clearTransaction());
    navigate("/");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando información de la transacción...</p>
        </div>
      </Layout>
    );
  }

  if (!currentTransaction) {
    return (
      <Layout>
        <div className={styles.error}>
          <CancelIcon className={styles.errorIcon} />
          <h2>Transacción no encontrada</h2>
          <p>No se pudo encontrar la información de esta transacción.</p>
          <button
            onClick={() => navigate("/")}
            className={styles.primaryButton}
          >
            <HomeIcon />
            Volver al inicio
          </button>
        </div>
      </Layout>
    );
  }

  const isApproved = currentTransaction.status === "APPROVED";
  const isDeclined = currentTransaction.status === "DECLINED";
  const isPending = currentTransaction.status === "PENDING";

 

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className={styles.resultPage}>
        <div className={styles.container}>
          <div className={styles.resultCard}>
            {/* Status Icon */}
            <div
              className={`${styles.statusIcon} ${
                styles[currentTransaction.status.toLowerCase()]
              }`}
            >
              {isApproved && <CheckCircleIcon className={styles.icon} />}
              {isDeclined && <CancelIcon className={styles.icon} />}
              {isPending && <HourglassEmptyIcon className={styles.icon} />}
            </div>

            {/* Status Title */}
            <h1 className={styles.statusTitle}>
              {isApproved && "¡Pago Exitoso!"}
              {isDeclined && "Pago Rechazado"}
              {isPending && "Pago Pendiente"}
            </h1>

            {/* Status Message */}
            <p className={styles.statusMessage}>
              {isApproved &&
                "Tu compra ha sido procesada correctamente. Recibirás un correo de confirmación pronto."}
              {isDeclined &&
                "No se pudo procesar tu pago. Por favor, verifica los datos de tu tarjeta e intenta nuevamente."}
              {isPending &&
                "Tu pago está siendo procesado. Te notificaremos cuando se complete."}
            </p>

            {/* Transaction Details */}
            <div className={styles.details}>
              <h3>Detalles de la Transacción</h3>

              <div className={styles.detailsGrid}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID de Transacción:</span>
                  <span className={styles.detailValue}>
                    {currentTransaction.id}
                  </span>
                </div>

                {currentTransaction.productName && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Producto:</span>
                    <span className={styles.detailValue}>
                      {currentTransaction.productName}
                    </span>
                  </div>
                )}

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Monto Total:</span>
                  <span className={styles.detailValue}>
                    {formatCurrency(currentTransaction.totalAmount || 0)}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Estado:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[currentTransaction.status.toLowerCase()]
                    }`}
                  >
                    {currentTransaction.status}
                  </span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Fecha:</span>
                  <span className={styles.detailValue}>
                    {formatDate(currentTransaction.createdAt)}
                  </span>
                </div>

                {currentTransaction.paymentId && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>
                      ID de Pago Wompi:
                    </span>
                    <span className={styles.detailValue}>
                      {currentTransaction.paymentId}
                    </span>
                  </div>
                )}

                {currentTransaction.deliveryAddress && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>
                      Dirección de entrega:
                    </span>
                    <span className={styles.detailValue}>
                      {currentTransaction.deliveryAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actions}>
              <button
                onClick={handleNewPurchase}
                className={styles.primaryButton}
              >
                <ShoppingCartIcon />
                Realizar otra compra
              </button>

              {isApproved && (
                <button
                  className={styles.secondaryButton}
                  onClick={handlePrint}
                >
                  <PrintIcon />
                  Imprimir recibo
                </button>
              )}

              {isDeclined && (
                <button
                  className={styles.secondaryButton}
                  onClick={() => navigate("/checkout")}
                >
                  Intentar de nuevo
                </button>
              )}
            </div>

            {/* Additional Info */}
            {isApproved && (
              <div className={styles.additionalInfo}>
                <p>
                  📧 Se ha enviado un correo de confirmación a tu email
                  registrado
                </p>
                <p>📦 Tu pedido será procesado en las próximas 24-48 horas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
