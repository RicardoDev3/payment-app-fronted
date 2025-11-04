import PropTypes from "prop-types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import styles from "./ProductSidebar.module.css";

const ProductSidebar = ({ product, baseFee, deliveryFee, total }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarCard}>
        <div className={styles.cardHeader}>
          <ShoppingCartIcon />
          <h3>Resumen de Compra</h3>
        </div>

        <div className={styles.productSection}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300/6366f1/ffffff?text=Producto";
            }}
          />
          <h4 className={styles.productName}>{product.name}</h4>
          <p className={styles.productDesc}>{product.description}</p>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceRow}>
            <span>Subtotal:</span>
            <span className={styles.priceValue}>
              {formatPrice(product.price)}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span>Tarifa base:</span>
            <span className={styles.priceValue}>{formatPrice(baseFee)}</span>
          </div>

          <div className={styles.priceRow}>
            <LocalShippingIcon className={styles.shippingIcon} />
            <span>Envío:</span>
            <span className={styles.priceValue}>
              {formatPrice(deliveryFee)}
            </span>
          </div>

          <div className={styles.divider}></div>

          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span>Total:</span>
            <span className={styles.totalValue}>{formatPrice(total)}</span>
          </div>
        </div>

        <div className={styles.secureInfo}>
          <p>🔒 Pago 100% seguro</p>
          <p>✓ Envío garantizado</p>
        </div>
      </div>
    </div>
  );
};

ProductSidebar.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  baseFee: PropTypes.number.isRequired,
  deliveryFee: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default ProductSidebar;
