import PropTypes from "prop-types";
import styles from "./Backdrop.module.css";

const Backdrop = ({ isVisible, message = "Cargando..." }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <div className={styles.spinner}></div>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

Backdrop.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default Backdrop;
