import PropTypes from "prop-types";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import styles from "./ProgressSteps.module.css";

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "Información Personal" },
    { number: 2, label: "Dirección de Entrega" },
    { number: 3, label: "Método de Pago" },
    { number: 4, label: "Resumen" },
  ];

  return (
    <div className={styles.progressContainer}>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div key={step.number} className={styles.stepGroup}>
            <div className={styles.stepItem}>
              <div
                className={`${styles.stepCircle} ${
                  currentStep === step.number
                    ? styles.active
                    : currentStep > step.number
                    ? styles.completed
                    : ""
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircleIcon className={styles.checkIcon} />
                ) : (
                  <span className={styles.stepNumber}>{step.number}</span>
                )}
              </div>
              <span
                className={`${styles.stepLabel} ${
                  currentStep >= step.number ? styles.activeLabel : ""
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`${styles.stepLine} ${
                  currentStep > step.number ? styles.completedLine : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default ProgressSteps;
