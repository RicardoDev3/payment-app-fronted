import { useState } from "react";
import PropTypes from "prop-types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import NotesIcon from "@mui/icons-material/Notes";
import styles from "./DeliveryForm.module.css";

const DeliveryForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    street: initialData.street || "",
    city: initialData.city || "",
    state: initialData.state || "",
    zipCode: initialData.zipCode || "",
    country: initialData.country || "Colombia",
    deliveryNotes: initialData.deliveryNotes || "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.street.trim()) {
      newErrors.street = "Dirección es requerida";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Ciudad es requerida";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Departamento es requerido";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Código postal es requerido";
    }

    if (!formData.country.trim()) {
      newErrors.country = "País es requerido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const deliveryData = {
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      deliveryNotes: formData.deliveryNotes,
    };

    onSubmit(deliveryData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        <LocalShippingIcon className={styles.titleIcon} />
        Información de Envío
      </h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <HomeIcon className={styles.labelIcon} />
          Dirección
        </label>
        <input
          type="text"
          className={`${styles.input} ${
            errors.street ? styles.inputError : ""
          }`}
          placeholder="Calle 123 #45-67"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />
        {errors.street && <span className={styles.error}>{errors.street}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <LocationCityIcon className={styles.labelIcon} />
            Ciudad
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.city ? styles.inputError : ""
            }`}
            placeholder="Medellín"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <LocationCityIcon className={styles.labelIcon} />
            Departamento
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.state ? styles.inputError : ""
            }`}
            placeholder="Antioquia"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
          {errors.state && <span className={styles.error}>{errors.state}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Código Postal</label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.zipCode ? styles.inputError : ""
            }`}
            placeholder="050001"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
          {errors.zipCode && (
            <span className={styles.error}>{errors.zipCode}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <PublicIcon className={styles.labelIcon} />
            País
          </label>
          <input
            type="text"
            className={`${styles.input} ${
              errors.country ? styles.inputError : ""
            }`}
            placeholder="Colombia"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
          {errors.country && (
            <span className={styles.error}>{errors.country}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <NotesIcon className={styles.labelIcon} />
          Notas de Entrega (Opcional)
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Ej: Dejar en portería, tocar timbre, etc."
          rows="3"
          value={formData.deliveryNotes}
          onChange={(e) =>
            setFormData({ ...formData, deliveryNotes: e.target.value })
          }
        />
        <span className={styles.hint}>Máximo 200 caracteres</span>
      </div>

      <button type="submit" className={styles.submitButton}>
        Continuar
      </button>
    </form>
  );
};

DeliveryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default DeliveryForm;
