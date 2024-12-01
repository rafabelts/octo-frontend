import { ReactNode } from 'react';
import { FinanceTabBar } from '~/components/finance-tab-bar';

export function FinanceLayout({ children }: { children: ReactNode }) {
  return (
    <div id="finance-layout">
      <FinanceTabBar />
      {children}
    </div>
  );
}
