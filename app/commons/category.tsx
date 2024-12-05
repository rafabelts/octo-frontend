import { useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BackButton } from '~/components/back-button';
import { useAppContext } from '~/context/ctxt';
import { getUserTransactionsByCategory } from '~/services/transactions';
import { ResponseOfCategory } from '~/types/category';
import { ResponseOfTransactions } from '~/types/finance';
import { filterByType } from '~/utils/filterByType';

export default function CategoryScreen() {
  const [categories, setCategories] = useState<Array<ResponseOfCategory>>([]);
  const [transactions, setTransactions] = useState<
    Array<ResponseOfTransactions>
  >([]);

  const ctx = useAppContext();

  const { category } = useParams();

  let content = <p>Loading...</p>;

  useEffect(() => {
    const type = ctx?.activeTab === 0 ? 'expense' : 'income';

    // get categories
    const fetchedCategories = sessionStorage.getItem('user_categories');

    if (!fetchedCategories) {
      console.error('No categories fetched');
      return;
    }

    const parsedCategories = JSON.parse(fetchedCategories);

    const filteredCategories = parsedCategories.filter(
      (category: ResponseOfCategory) => filterByType(category, type)
    );

    setCategories(filteredCategories);

    // get transaction by category
    async function getTransactions() {
      const selectedCategory = filteredCategories.find(
        (cat: ResponseOfCategory) =>
          cat.name.split(' ')[0].toLocaleLowerCase() === category?.toLowerCase()
      );

      if (!selectedCategory) {
        console.error("can't get transactions");
        return;
      }

      const transactions = await getUserTransactionsByCategory(
        10000,
        selectedCategory.categoryId
      );

      setTransactions(transactions);
    }

    getTransactions();
  }, [ctx?.activeTab]);

  const selectedCategory = categories.find(
    (cat) =>
      cat.name.split(' ')[0].toLocaleLowerCase() === category?.toLowerCase()
  );

  // calculate total amount
  const totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  if (selectedCategory) {
    const categoryData = selectedCategory;

    content = (
      <main>
        <p className="text-h5 font-bold text-primary-dark mb-5 mt-2">
          Total gastado en {`${categoryData.name.toLowerCase()}`}: $
          {`${totalAmount.toFixed(2)}`}
        </p>

        <h1 className="mb-5">{categoryData.name}</h1>
        <p className="text-title1 text-neutral-normal font-semibold">
          Resumen:
        </p>
        {transactions.length === 0 ? (
          <p>No se han registrado transacciones para la categoría</p>
        ) : (
          <div className="flex flex-col gap-5 mt-2">
            {transactions.map((transaction: ResponseOfTransactions) => (
              <div
                key={transaction.transactionId}
                className="flex flex-row justify-between"
              >
                <p>{transaction.title}</p>
                <p>{new Date(transaction.date).toLocaleDateString('es-MX')}</p>
                <p>{`$${transaction.amount}`}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  } else {
    content = (
      <main>
        <p>La categoría no se encuentra disponible</p>
      </main>
    );
  }

  return (
    <div>
      <div className="mt-5 mb-2">
        <BackButton path="/finances/categories" />
      </div>
      {content}
    </div>
  );
}
