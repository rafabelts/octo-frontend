/*import { z } from 'zod';

export const financeSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Por favor, ingresa el título de la transacción' }),
  amount: z
    .number()
    .min(1, {
      message: 'Por favor, ingresa el importe total de la transacción',
    }),
}*/

export interface TransactionData {
  title: string;
  amount: number;
}

export interface ResponseOfTransactions {
  transactionId: number;
  amount: number;
  title: string;
  type: string;
  date: string;
  user: number;
  category: number;
  isActive: boolean;
  categoryIcon: string;
  categoryColor: string;
}
