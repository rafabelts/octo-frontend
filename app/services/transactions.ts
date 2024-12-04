import { TransactionData } from '~/types/finance';

// user and category are number type because we are going to recive the id
export async function addTransaction(
  transactionData: TransactionData,
  type: string,
  user: number,
  category: number
) {
  try {
    const response = await fetch('http://localhost:8080/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: transactionData.title,
        amount: transactionData.amount,
        type: type,
        user: user,
        category: category,
      }),
    });

    console.log(response.body);

    if (response.status === 201) {
      console.log('Transaction added');
    }
  } catch {
    console.error('Error adding transaction');
  }
}
