import PropTypes from "prop-types";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onBuyClick }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        {isOutOfStock && <div className={styles.outOfStockBadge}>Agotado</div>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.details}>
          <div className={styles.priceContainer}>
            <LocalOfferIcon className={styles.icon} />
            <span className={styles.price}>{formatPrice(product.price)}</span>
          </div>

          <div className={styles.stockContainer}>
            <InventoryIcon className={styles.icon} />
            <span
              className={`${styles.stock} ${
                isOutOfStock ? styles.stockOut : ""
              }`}
            >
              {isOutOfStock ? "Sin stock" : `${product.stock} disponibles`}
            </span>
          </div>
        </div>

        <button
          className={`${styles.buyButton} ${
            isOutOfStock ? styles.disabled : ""
          }`}
          onClick={() => onBuyClick(product)}
          disabled={isOutOfStock}
        >
          <ShoppingCartIcon className={styles.buttonIcon} />
          {isOutOfStock ? "No disponible" : "Comprar ahora"}
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onBuyClick: PropTypes.func.isRequired,
};

export default ProductCard;
