/**
 * @type {import('ts-to-zod').TsToZodConfig}
 */
module.exports = [
  {
    name: "main",
    input: "src/interfaces/paymentCrudApiModel.ts",
    output: "src/schemas/paymentCrudSchema.ts",
    schemaMapping: {
      // Mapeamos el tipo Decimal a tu helper personalizado
      Decimal: "decimalSchema", 
    },
    // Esto agrega el import automáticamente al archivo generado
    customImport: "import { decimalSchema } from '../utils/zodUtils';",
  },
];