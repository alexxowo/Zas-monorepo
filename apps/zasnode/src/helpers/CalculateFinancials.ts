import { Decimal } from '@prisma/client/runtime/library';

// Helper privado para centralizar la fórmula matemática
export const calculateFinancials = (salePriceInput: number | Decimal, priceBaseInput: number | Decimal) => {
  const salePrice = new Decimal(salePriceInput);
  const priceBase = new Decimal(priceBaseInput);

  // 1. Margen monetario
  const margin = salePrice.minus(priceBase);

  // 2. Margen Porcentual (Margen Bruto)
  // Evitamos división por cero
  const marginPercent = salePrice.isZero()
    ? new Decimal(0)
    : margin.dividedBy(salePrice);

  return {
    salePrice, // Devolvemos ya convertido a Decimal
    priceBase, // Devolvemos ya convertido a Decimal
    margin,
    marginPercent
  };
};