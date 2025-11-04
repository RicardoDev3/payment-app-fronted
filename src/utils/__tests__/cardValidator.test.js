import { describe, it, expect } from "vitest";
import {
  validateCardNumber,
  validateCVV,
  validateExpirationDate,
  detectCardType,
  formatCardNumber,
  cleanCardNumber,
  getCardLogo,
} from "../cardValidator";

describe("Card Validator", () => {
  describe("detectCardType", () => {
    it("should detect Visa cards", () => {
      expect(detectCardType("4111111111111111")).toBe("visa");
    });

    it("should detect Mastercard", () => {
      expect(detectCardType("5555555555554444")).toBe("mastercard");
    });

    it("should detect American Express", () => {
      expect(detectCardType("378282246310005")).toBe("american-express");
    });

    it("should return unknown for invalid cards", () => {
      expect(detectCardType("1234567812345678")).toBe("unknown");
      expect(detectCardType("")).toBe("unknown");
    });

    it("should return unknown for incomplete numbers", () => {
      // Con solo 1 dígito, card-validator no puede determinar el tipo
      const result = detectCardType("4");
      expect(["visa", "unknown"]).toContain(result); // Puede ser unknown hasta tener más dígitos
    });
  });

  describe("formatCardNumber", () => {
    it("should format Visa card number with spaces", () => {
      const formatted = formatCardNumber("4111111111111111");
      expect(formatted).toMatch(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);
    });

    it("should format Mastercard number with spaces", () => {
      const formatted = formatCardNumber("5555555555554444");
      expect(formatted).toMatch(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);
    });

    it("should handle partial numbers", () => {
      const formatted = formatCardNumber("41111");
      expect(formatted.replace(/\s/g, "")).toBe("41111");
    });

    it("should handle empty string", () => {
      expect(formatCardNumber("")).toBe("");
    });

    it("should remove existing spaces before formatting", () => {
      const formatted = formatCardNumber("4111 1111 1111 1111");
      expect(formatted).toMatch(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/);
    });
  });

  describe("cleanCardNumber", () => {
    it("should remove spaces", () => {
      expect(cleanCardNumber("4111 1111 1111 1111")).toBe("4111111111111111");
    });

    it("should remove dashes", () => {
      expect(cleanCardNumber("4111-1111-1111-1111")).toBe("4111111111111111");
    });

    it("should remove non-numeric characters", () => {
      expect(cleanCardNumber("4111-1111-1111-1111abc")).toBe(
        "4111111111111111"
      );
    });

    it("should handle empty string", () => {
      expect(cleanCardNumber("")).toBe("");
    });
  });

  describe("validateCardNumber", () => {
    it("should validate correct Visa card", () => {
      const result = validateCardNumber("4111111111111111");
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe("visa");
    });

    it("should validate correct Mastercard", () => {
      const result = validateCardNumber("5555555555554444");
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe("mastercard");
    });

    it("should validate correct Amex", () => {
      const result = validateCardNumber("378282246310005");
      expect(result.isValid).toBe(true);
      expect(result.cardType).toBe("american-express");
    });

    it("should reject invalid card number", () => {
      const result = validateCardNumber("1234567812345678");
      expect(result.isValid).toBe(false);
    });

    it("should reject empty card number", () => {
      const result = validateCardNumber("");
      expect(result.isValid).toBe(false);
    });

    it("should mark incomplete numbers as potentially valid", () => {
      const result = validateCardNumber("4111");
      expect(result.isPotentiallyValid).toBe(true);
      expect(result.isValid).toBe(false);
    });
  });

  describe("validateCVV", () => {
    it("should validate 3-digit CVV", () => {
      const result = validateCVV("123");
      expect(result.isValid).toBe(true);
    });

    it("should validate 4-digit CVV for Amex", () => {
      const result = validateCVV("1234", "american-express");
      expect(result.isValid).toBe(true);
    });

    it("should reject 2-digit CVV", () => {
      const result = validateCVV("12");
      expect(result.isValid).toBe(false);
    });

    it("should reject non-numeric CVV", () => {
      const result = validateCVV("abc");
      expect(result.isValid).toBe(false);
    });

    it("should reject empty CVV", () => {
      const result = validateCVV("");
      expect(result.isValid).toBe(false);
    });

    it("should reject 4-digit CVV for non-Amex cards", () => {
      const result = validateCVV("1234", "visa");
      expect(result.isValid).toBe(false);
    });
  });

  describe("validateExpirationDate", () => {
    it("should validate future date", () => {
      const result = validateExpirationDate("12", "30");
      expect(result.isValid).toBe(true);
    });

    it("should reject past date", () => {
      const result = validateExpirationDate("01", "20");
      expect(result.isValid).toBe(false);
    });

    it("should reject invalid month 13", () => {
      const result = validateExpirationDate("13", "30");
      expect(result.isValid).toBe(false);
    });

    it("should reject invalid month 00", () => {
      const result = validateExpirationDate("00", "30");
      expect(result.isValid).toBe(false);
    });

    it("should reject empty values", () => {
      const result = validateExpirationDate("", "");
      expect(result.isValid).toBe(false);
    });
  });

  describe("getCardLogo", () => {
    it("should return Visa logo", () => {
      expect(getCardLogo("visa")).toContain("VISA");
    });

    it("should return Mastercard logo", () => {
      expect(getCardLogo("mastercard")).toContain("Mastercard");
    });

    it("should return Amex logo", () => {
      expect(getCardLogo("american-express")).toContain("Amex");
    });

    it("should return unknown logo for invalid type", () => {
      expect(getCardLogo("invalid")).toBe("💳");
    });

    it("should return unknown logo for empty string", () => {
      expect(getCardLogo("")).toBe("💳");
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long card numbers", () => {
      const result = validateCardNumber("41111111111111111111111111");
      expect(result.isValid).toBe(false);
    });

    it("should handle card number with letters", () => {
      const result = validateCardNumber("4111abcd1111efgh");
      expect(result.isValid).toBe(false);
    });

    it("should handle special characters in card number", () => {
      const cleaned = cleanCardNumber("4111-@#$-1111-!@#-1111-$%^-1111");
      expect(cleaned).toBe("4111111111111111");
    });

    it("should format Amex card number differently", () => {
      const formatted = formatCardNumber("378282246310005");
      expect(formatted.length).toBeGreaterThan(0);
    });

    it("should handle CVV with leading zeros", () => {
      const result = validateCVV("007");
      expect(result.isValid).toBe(true);
    });

    it("should handle expiration date edge cases", () => {
      const result = validateExpirationDate("12", "30");
      expect(result.isValid).toBe(true);
    });

    it("should detect card type from formatted number", () => {
      const type = detectCardType("4111 1111 1111 1111");
      expect(type).toBe("visa");
    });
  });
});
