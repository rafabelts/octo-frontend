import { Link, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import FinanceResumeListItem from '~/components/finance-resume-list-item';
import { PieGraph } from '~/components/graph';
import { getUserCategories } from '~/services/categories';
import { getUserTransactions } from '~/services/transactions';
import { ResponseOfCategory } from '~/types/category';
import { ResponseOfTransactions, TransactionData } from '~/types/finance';
import { filterByType } from '~/utils/filterByType';

export function FinanceScreen({ tab }: { tab: number }) {
  const [transactions, setTransactions] = useState<
    Array<ResponseOfTransactions>
  >([]);

  const navigate = useNavigate();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total gastado $',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');

    const type = tab === 0 ? 'expense' : 'income';

    async function getTransactionsAndCategories(user: number) {
      const categories = await getUserCategories(user);
      const transactions = await getUserTransactions(user);

      const filteredTransactions = transactions.filter(
        (transaction: ResponseOfTransactions) => filterByType(transaction, type)
      );

      setTransactions(filteredTransactions);
      sessionStorage.setItem('user_categories', JSON.stringify(categories));

      const fetchedCategories = sessionStorage.getItem('user_categories');

      if (!fetchedCategories) {
        console.error('No categories fetched');
        return;
      }

      const parsedCategories = JSON.parse(fetchedCategories);

      const filteredCategories = parsedCategories.filter(
        (category: ResponseOfCategory) => filterByType(category, type)
      );

      // get categories names and colors
      const categoriesName = filteredCategories.map(
        (fc: ResponseOfCategory) => fc.name
      );
      const categoriesColor = filteredCategories.map(
        (fc: ResponseOfCategory) => fc.color
      );

      const categoriesAmount = filteredCategories.map(
        (fc: ResponseOfCategory) => {
          const transactions = filteredTransactions.filter(
            (t: ResponseOfTransactions) => t.category === fc.categoryId
          );

          const totalAmount = transactions.reduce(
            (sum: number, transaction: ResponseOfTransactions) =>
              sum + transaction.amount,
            0
          );

          return totalAmount;
        }
      );

      // Update chart data
      setChartData({
        labels: categoriesName,
        datasets: [
          {
            label: tab === 0 ? 'Total gastado $' : 'Total ingresado $',
            data: categoriesAmount,
            backgroundColor: categoriesColor,
          },
        ],
      });
    }

    if (!userId) return navigate('/', { replace: true });

    const parsedId = parseInt(userId);

    console.log(parsedId);
    getTransactionsAndCategories(parsedId);
  }, [tab]);

  // calculate total amount
  const totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  return (
    <div>
      {transactions.length === 0 ? (
        <h1 className="mt-5 text-[30px]">No se han realizado movimientos</h1>
      ) : (
        <div id="finance-screen" className="mt-5">
          <h1 className="text-[30px]">
            Tus {tab === 0 ? 'gastos' : 'ingresos'} del mes
          </h1>
          <div id="expenses-report-dashbord">
            <PieGraph chartData={chartData} />
            <p className="text-center mt-2 text-title2 font-bold text-primary-normalActive">
              Total {tab === 0 ? 'gastado' : 'recibido'}: $
              {`${totalAmount.toFixed(2)}`}
            </p>
          </div>

          <div id="expenses-resume" className="mb-4">
            <h2 className="text-title1 font-bold text-primary-darkActive mt-4">
              Resumen:
            </h2>
            {
              <ul className="flex flex-col gap-4 mt-2">
                {transactions
                  .sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateB - dateA;
                  })
                  .slice(0, 4)
                  .map((transaction) => (
                    <FinanceResumeListItem
                      key={transaction.transactionId}
                      categoryIcon={transaction.categoryIcon}
                      categoryColor={transaction.categoryColor}
                      name={transaction.title}
                      total={transaction.amount}
                    />
                  ))}
              </ul>
            }
          </div>

          <Link
            to="/finances/categories"
            className="text-body text-primary-normal font-bold"
          >
            Ver mas &gt;
          </Link>
        </div>
      )}
      <Link to="/finances/add">
        <button className="fixed bottom-6 right-1 w-14 h-14 bg-[#725CC9] rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10 text-neutral-light font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
