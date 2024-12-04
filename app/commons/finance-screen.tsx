import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import FinanceResumeListItem from '~/components/finance-resume-list-item';
import { PieGraph } from '~/components/graph';

export function FinanceScreen({ tab }: { tab: number }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total gastado $',
        data: [],
        backgroundColor: ['#B91F1F', '#281F3D', '#00863A', '#FFCE1F'],
      },
    ],
  });

  useEffect(() => {
    const categories =
      tab === 0
        ? ['Alimentos', 'Salud e higiene', 'Suscripciones', 'Servicios']
        : ['Trabajo', 'Inversiones', 'Otro'];

    const ammountOfTransactions =
      tab === 0 ? [200, 50, 500, 250] : [20000, 2000, 5000];

    setChartData({
      labels: categories,
      datasets: [
        {
          label: 'Total gastado $',
          data: ammountOfTransactions,

          backgroundColor:
            tab === 0
              ? ['#B91F1F', '#281F3D', '#00863A', '#FFCE1F']
              : ['#FFCE1F', '#281F3D', '#D4CCF0'],
        },
      ],
    });
  }, [tab]);

  const expenses = [
    {
      categoryIcon: '🥘',
      categoryColor: 'bg-[#B91F1F]',
      name: 'Pizza',
      total: '200',
    },
    {
      categoryIcon: '🏥',
      categoryColor: 'bg-[#281F3D]',
      name: 'Pasta de dientes',
      total: '50',
    },
    {
      categoryIcon: '🧾',
      categoryColor: 'bg-[#FFCE1F]',
      name: 'Luz',
      total: '500',
    },
    {
      categoryIcon: '💻',
      categoryColor: 'bg-[#00863A]',
      name: 'Netflix',
      total: '250',
    },
  ];

  return (
    <div id="finance-screen" className="mt-5">
      <h1 className="text-[30px]">
        Tus {tab === 0 ? 'gastos' : 'ingresos'} del mes
      </h1>
      <div id="expenses-report-dashbord">
        <PieGraph chartData={chartData} />
        <p className="text-center mt-2 text-title2 font-bold text-primary-normalActive">
          Total {tab === 0 ? 'gastado' : 'recibido'}: $1000
        </p>

        {tab === 0 ? (
          <></>
        ) : (
          <p className="text-center text-body">
            Balance con lo gastado: $26,000
          </p>
        )}
      </div>

      <div id="expenses-resume" className="mb-4">
        <h2 className="text-title1 font-bold text-primary-darkActive mt-4">
          Resumen:
        </h2>
        <ul className="flex flex-col gap-4 mt-2">
          {expenses.map((expense, i) => (
            <FinanceResumeListItem key={i} {...expense} />
          ))}
        </ul>
      </div>

      <Link
        to="/finances/categories"
        className="text-body text-primary-normal font-bold"
      >
        Ver mas &gt;
      </Link>

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
