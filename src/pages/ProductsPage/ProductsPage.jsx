import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../store/slices/productsSlice";
import { setSelectedProduct } from "../../store/slices/cartSlice";
import { clearTransaction } from "../../store/slices/transactionSlice";
import { showInfoToast } from "../../utils/alertsCard";
import styles from "./ProductsPage.module.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    // Limpiar transacción anterior si existe
    dispatch(clearTransaction());
  }, [dispatch]);

  const handleBuyClick = (product) => {
    dispatch(setSelectedProduct(product));
    showInfoToast(`Comprando: ${product.name}`);
    navigate(`/checkout/${product.id}`);
  };

  const handleRefresh = () => {
    dispatch(fetchProducts());
    showInfoToast("Actualizando productos...");
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className="spinner"></div>
          <p className={styles.loadingText}>Cargando productos...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error al cargar productos</h2>
          <p className={styles.errorText}>{error}</p>
          <button className={styles.retryButton} onClick={handleRefresh}>
            <RefreshIcon />
            Reintentar
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Tienda Online">
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Nuestros Productos</h2>
            <p className={styles.subtitle}>
              Encuentra los mejores productos con stock disponible
            </p>
          </div>
          <button className={styles.refreshButton} onClick={handleRefresh}>
            <RefreshIcon />
            Actualizar
          </button>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No hay productos disponibles</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuyClick={handleBuyClick}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
