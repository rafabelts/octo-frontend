import { Outlet } from '@remix-run/react';
import { FinanceLayout } from './finance-layout';

export function FinanceLayoutWrapper() {
  return (
    <FinanceLayout>
      <Outlet />
    </FinanceLayout>
  );
}
