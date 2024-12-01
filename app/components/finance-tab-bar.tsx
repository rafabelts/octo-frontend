import { useEffect } from 'react';
import { useAppContext } from '~/context/ctxt';

export function FinanceTabBar() {
  const ctx = useAppContext();

  const tabs = [
    { index: 0, label: 'Gastos' },
    { index: 1, label: 'Ingresos' },
  ];

  const handleTabChange = (index: number) => {
    if (index !== ctx!.activeTab) {
      ctx?.updateActiveTab(index);
      sessionStorage.setItem('activeTab', index.toString());
    }
  };

  useEffect(() => {
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
      ctx?.updateActiveTab(Number(savedTab));
    }

    console.log(savedTab);
  }, []);

  return (
    <div className="px-2 flex flex-row gap-1 items-center justify-center">
      {tabs.map((tab) => (
        <button
          className={`px-2 py-1 text-title2 font-semibold ${
            ctx!.activeTab === tab.index
              ? 'bg-primary-normal  text-neutral-light'
              : 'bg-primary-lightHover text-neutral-darker'
          } ${tab.index === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}
          key={tab.index}
          onClick={() => handleTabChange(tab.index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
