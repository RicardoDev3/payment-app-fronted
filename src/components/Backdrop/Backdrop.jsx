import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Backdrop.module.css";

const Backdrop = ({ isOpen, onClose, frontContent, backContent }) => {
  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.open : ""}`}>
      {/* Front Layer */}
      <div className={styles.frontLayer}>
        <div className={styles.frontContent}>{frontContent}</div>
        <button className={styles.revealButton} onClick={onClose}>
          <KeyboardArrowDownIcon className={styles.icon} />
          <span>Ver resumen</span>
        </button>
      </div>

      {/* Back Layer */}
      <div className={styles.backLayer}>
        <div className={styles.backContent}>{backContent}</div>
      </div>
    </div>
  );
};

Backdrop.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
};

export default Backdrop;
