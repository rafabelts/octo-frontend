import { ResponseOfCategory } from '~/types/category';
import { ResponseOfTransactions } from '~/types/finance';

export const filterByType = (
  obj: ResponseOfCategory | ResponseOfTransactions,
  type: string
) => {
  if ('type' in obj && obj.type === type) {
    return true;
  }
  return false;
};
