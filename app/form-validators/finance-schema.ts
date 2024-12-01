import { z } from 'zod';

export const financeSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Por favor, ingresa el título de la transacción' }),
  amount: z.number().min(1, {
    message: 'Por favor, ingresa el importe total de la transacción',
  }),
});
