import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({
  product,
  customer,
  delivery,
  subtotal,
  baseFee,
  deliveryFee,
  total,
  onConfirm,
  onBack,
  loading,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>
        <CheckCircleIcon className={styles.titleIcon} />
        Confirmar Pedido
      </h2>

      {/* Producto */}
      <div className={styles.section}>
        <h3>Producto</h3>
        <div className={styles.productInfo}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/200x150/6366f1/ffffff?text=Producto";
            }}
          />
          <div>
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* Información del Cliente */}
      <div className={styles.section}>
        <h3>Información Personal</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <PersonIcon className={styles.icon} />
            <div>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{customer.fullName}</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <EmailIcon className={styles.icon} />
            <div>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{customer.email}</span>
            </div>
          </div>
          <div className={styles.infoItem}>
            <PhoneIcon className={styles.icon} />
            <div>
              <span className={styles.label}>Teléfono:</span>
              <span className={styles.value}>{customer.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dirección de Entrega */}
      <div className={styles.section}>
        <h3>Dirección de Entrega</h3>
        <div className={styles.addressBox}>
          <HomeIcon className={styles.addressIcon} />
          <div>
            <p>{delivery.address?.street}</p>
            <p>
              {delivery.address?.city}, {delivery.address?.state}
            </p>
            <p>
              {delivery.address?.zipCode}, {delivery.address?.country}
            </p>
            {delivery.deliveryNotes && (
              <p className={styles.notes}>
                <strong>Notas:</strong> {delivery.deliveryNotes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desglose de Precios */}
      <div className={styles.section}>
        <h3>Desglose de Precios</h3>
        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Subtotal:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Tarifa base:</span>
            <span>{formatPrice(baseFee)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Envío:</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span>Total a Pagar:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className={styles.actions}>
        <button
          onClick={onBack}
          className={styles.backButton}
          disabled={loading}
        >
          <ArrowBackIcon />
          Volver
        </button>
        <button
          onClick={onConfirm}
          className={styles.confirmButton}
          disabled={loading}
        >
          <CreditCardIcon />
          {loading ? "Procesando..." : "Confirmar y Pagar"}
        </button>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  product: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  delivery: PropTypes.object.isRequired,
  subtotal: PropTypes.number.isRequired,
  baseFee: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default OrderSummary;
