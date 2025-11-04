export const formatCurrency = (amountInCents) => {
  console.log(amountInCents);

  if (!amountInCents || isNaN(amountInCents)) return "$ 0";

  const amountInPesos = amountInCents / 100;

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInPesos);
};
