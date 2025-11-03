import cardValidator from "card-validator";

/**
 * Detectar tipo de tarjeta
 */
export const detectCardType = (cardNumber) => {
  const numberValidation = cardValidator.number(cardNumber);

  if (numberValidation.card) {
    return numberValidation.card.type;
  }

  return "unknown";
};

/**
 * Validar número de tarjeta
 */
export const validateCardNumber = (cardNumber) => {
  const validation = cardValidator.number(cardNumber);
  return {
    isValid: validation.isValid,
    isPotentiallyValid: validation.isPotentiallyValid,
    cardType: validation.card?.type || "unknown",
  };
};

/**
 * Validar fecha de expiración
 */
export const validateExpirationDate = (month, year) => {
  const validation = cardValidator.expirationDate(`${month}/${year}`);
  return {
    isValid: validation.isValid,
    isPotentiallyValid: validation.isPotentiallyValid,
  };
};

/**
 * Validar CVV
 */
export const validateCVV = (cvv, cardType) => {
  const validation = cardValidator.cvv(
    cvv,
    cardType === "american-express" ? 4 : 3
  );
  return {
    isValid: validation.isValid,
    isPotentiallyValid: validation.isPotentiallyValid,
  };
};

/**
 * Validar nombre del titular
 */
export const validateCardholderName = (name) => {
  const validation = cardValidator.cardholderName(name);
  return {
    isValid: validation.isValid,
    isPotentiallyValid: validation.isPotentiallyValid,
  };
};

/**
 * Formatear número de tarjeta con espacios
 */
export const formatCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, "");
  const validation = cardValidator.number(cleaned);

  if (validation.card) {
    const gaps = validation.card.gaps;
    let formatted = "";
    let lastGap = 0;

    gaps.forEach((gap) => {
      formatted += cleaned.substring(lastGap, gap) + " ";
      lastGap = gap;
    });

    formatted += cleaned.substring(lastGap);
    return formatted.trim();
  }

  // Formato por defecto: grupos de 4
  return cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
};

/**
 * Validar tarjeta completa
 */
export const validateCard = (cardData) => {
  const errors = [];

  // Validar número
  const numberValidation = validateCardNumber(cardData.number);
  if (!numberValidation.isValid) {
    errors.push("Número de tarjeta inválido");
  }

  // Validar CVV
  const cvvValidation = validateCVV(cardData.cvc, numberValidation.cardType);
  if (!cvvValidation.isValid) {
    errors.push("CVV inválido");
  }

  // Validar fecha de expiración
  const expirationValidation = validateExpirationDate(
    cardData.expMonth,
    cardData.expYear
  );
  if (!expirationValidation.isValid) {
    errors.push("Fecha de expiración inválida");
  }

  // Validar nombre del titular
  const nameValidation = validateCardholderName(cardData.cardHolder);
  if (!nameValidation.isValid) {
    errors.push("Nombre del titular inválido");
  }

  return {
    isValid: errors.length === 0,
    errors,
    cardType: numberValidation.cardType,
  };
};

/**
 * Obtener logo de tarjeta según tipo
 */
export const getCardLogo = (cardType) => {
  const logos = {
    visa: "💳 VISA",
    mastercard: "💳 Mastercard",
    "american-express": "💳 Amex",
    discover: "💳 Discover",
    unknown: "💳",
  };

  return logos[cardType] || logos.unknown;
};

/**
 * Limpiar número de tarjeta (solo dígitos)
 */
export const cleanCardNumber = (cardNumber) => {
  return cardNumber.replace(/\D/g, "");
};
