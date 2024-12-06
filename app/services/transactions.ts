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
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

// user is number type because we are going to recive the id
export async function getUserTransactions(user: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transactions?userId=${user}`,
      {
        method: 'GET',
      }
    );

    if (response.status === 200) {
      const transactions = await response.json();
      return transactions;
    }
  } catch {
    console.error('Error loading transactions');
  }
}

export async function getUserTransactionsByCategory(
  user: number,
  category: number
) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transactions/category?userId=${user}&categoryId=${category}`,
      {
        method: 'GET',
      }
    );

    if (response.status === 200) {
      const transactions = await response.json();
      console.log('hey: ', transactions);
      return transactions;
    }
  } catch {
    console.error('Error loading transactions');
  }
}

/*

*/
