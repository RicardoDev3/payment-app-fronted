import { useState } from "react";
import PropTypes from "prop-types";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import styles from "./CustomerForm.module.css";

const CustomerForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    email: initialData.email || "",
    fullName: initialData.fullName || "",
    phoneNumber: initialData.phoneNumber || "",
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    if (value && !validateEmail(value)) {
      setErrors({ ...errors, email: "Email inválido" });
    } else {
      const newErrors = { ...errors };
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, phoneNumber: value });

    if (value && !validatePhone(value)) {
      setErrors({
        ...errors,
        phoneNumber: "Teléfono inválido. Formato: +573001234567",
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors.phoneNumber;
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email es requerido";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nombre completo es requerido";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Nombre debe tener al menos 3 caracteres";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Teléfono es requerido";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Teléfono inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>
        <PersonIcon className={styles.titleIcon} />
        Información del Cliente
      </h3>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <EmailIcon className={styles.labelIcon} />
          Correo Electrónico
        </label>
        <input
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="correo@ejemplo.com"
          value={formData.email}
          onChange={handleEmailChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <PersonIcon className={styles.labelIcon} />
          Nombre Completo
        </label>
        <input
          type="text"
          className={`${styles.input} ${
            errors.fullName ? styles.inputError : ""
          }`}
          placeholder="Juan Pérez"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />
        {errors.fullName && (
          <span className={styles.error}>{errors.fullName}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          <PhoneIcon className={styles.labelIcon} />
          Teléfono
        </label>
        <input
          type="tel"
          className={`${styles.input} ${
            errors.phoneNumber ? styles.inputError : ""
          }`}
          placeholder="+573001234567"
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
        />
        {errors.phoneNumber && (
          <span className={styles.error}>{errors.phoneNumber}</span>
        )}
        <span className={styles.hint}>
          Formato internacional: +57 seguido del número
        </span>
      </div>

      <button type="submit" className={styles.submitButton}>
        Continuar
      </button>
    </form>
  );
};

CustomerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default CustomerForm;
