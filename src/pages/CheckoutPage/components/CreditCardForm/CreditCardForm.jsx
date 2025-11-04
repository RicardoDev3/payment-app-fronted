/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LockIcon from "@mui/icons-material/Lock";
import {
  cleanCardNumber,
  detectCardType,
  formatCardNumber,
  validateCardNumber,
  validateCVV,
  validateExpirationDate,
} from "../../../../utils/cardValidator";
import styles from "./CreditCardForm.module.css";

const CreditCardForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    number: initialData.number || "",
    cvc: initialData.cvc || "",
    exp_month: initialData.exp_month || "",
    exp_year: initialData.exp_year || "",
    card_holder: initialData.card_holder || "",
  });

  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("unknown");

  const handleCardNumberChange = (e) => {
    const cleaned = cleanCardNumber(e.target.value);
    if (cleaned.length <= 19) {
      const formatted = formatCardNumber(cleaned);
      setFormData({ ...formData, number: cleaned });

      const type = detectCardType(cleaned);
      setCardType(type);

      if (cleaned.length >= 13) {
        const validation = validateCardNumber(cleaned);
        if (!validation.isValid) {
          setErrors({ ...errors, number: "Número de tarjeta inválido" });
        } else {
          const newErrors = { ...errors };
          delete newErrors.number;
          setErrors(newErrors);
        }
      }
    }
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setFormData({ ...formData, cvc: value });

      if (value.length >= 3) {
        const validation = validateCVV(value, cardType);
        if (!validation.isValid) {
          setErrors({ ...errors, cvc: "CVV inválido" });
        } else {
          const newErrors = { ...errors };
          delete newErrors.cvc;
          setErrors(newErrors);
        }
      }
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setFormData({ ...formData, exp_month: value });

      if (value.length === 2 && formData.exp_year.length === 2) {
        const validation = validateExpirationDate(value, formData.exp_year);
        if (!validation.isValid) {
          setErrors({ ...errors, expiration: "Fecha de expiración inválida" });
        } else {
          const newErrors = { ...errors };
          delete newErrors.expiration;
          setErrors(newErrors);
        }
      }
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setFormData({ ...formData, exp_year: value });

      if (value.length === 2 && formData.exp_month.length === 2) {
        const validation = validateExpirationDate(formData.exp_month, value);
        if (!validation.isValid) {
          setErrors({ ...errors, expiration: "Fecha de expiración inválida" });
        } else {
          const newErrors = { ...errors };
          delete newErrors.expiration;
          setErrors(newErrors);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    const newErrors = {};

    const numberValidation = validateCardNumber(formData.number);
    if (!numberValidation.isValid) {
      newErrors.number = "Número de tarjeta inválido";
    }

    const cvvValidation = validateCVV(formData.cvc, cardType);
    if (!cvvValidation.isValid) {
      newErrors.cvc = "CVV inválido";
    }

    const expirationValidation = validateExpirationDate(
      formData.exp_month,
      formData.exp_year
    );
    if (!expirationValidation.isValid) {
      newErrors.expiration = "Fecha de expiración inválida";
    }

    if (!formData.card_holder.trim()) {
      newErrors.card_holder = "Nombre del titular es requerido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const getCardIcon = () => {
    if (cardType === "visa") return "💳 VISA";
    if (cardType === "mastercard") return "💳 Mastercard";
    return "💳";
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        <CreditCardIcon className={styles.titleIcon} />
        Información de la Tarjeta
      </h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Número de Tarjeta
          {cardType !== "unknown" && (
            <span className={styles.cardType}>{getCardIcon()}</span>
          )}
        </label>
        <input
          type="text"
          className={`${styles.input} ${
            errors.number ? styles.inputError : ""
          }`}
          placeholder="1234 5678 9012 3456"
          value={formatCardNumber(formData.number)}
          onChange={handleCardNumberChange}
          maxLength="19"
        />
        {errors.number && <span className={styles.error}>{errors.number}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Mes</label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.expiration ? styles.inputError : ""
            }`}
            placeholder="MM"
            value={formData.exp_month}
            onChange={handleMonthChange}
            maxLength="2"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Año</label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.expiration ? styles.inputError : ""
            }`}
            placeholder="AA"
            value={formData.exp_year}
            onChange={handleYearChange}
            maxLength="2"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            CVV
            <LockIcon className={styles.lockIcon} />
          </label>
          <input
            type="text"
            className={`${styles.input} ${errors.cvc ? styles.inputError : ""}`}
            placeholder="123"
            value={formData.cvc}
            onChange={handleCVVChange}
            maxLength="4"
          />
        </div>
      </div>
      {errors.expiration && (
        <span className={styles.error}>{errors.expiration}</span>
      )}
      {errors.cvc && <span className={styles.error}>{errors.cvc}</span>}

      <div className={styles.formGroup}>
        <label className={styles.label}>Nombre del Titular</label>
        <input
          type="text"
          className={`${styles.input} ${
            errors.card_holder ? styles.inputError : ""
          }`}
          placeholder="COMO APARECE EN LA TARJETA"
          value={formData.card_holder}
          onChange={(e) =>
            setFormData({
              ...formData,
              card_holder: e.target.value.toUpperCase(),
            })
          }
        />
        {errors.card_holder && (
          <span className={styles.error}>{errors.card_holder}</span>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        Continuar
      </button>
    </form>
  );
};

CreditCardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CreditCardForm;
