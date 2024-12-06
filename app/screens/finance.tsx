import { FinanceScreen } from '~/commons/finance-screen';
import { useAppContext } from '~/context/ctxt';
import { FinanceLayout } from '~/layouts/finance-layout';

export default function Finance() {
  const ctx = useAppContext();

  return (
    <main>
      <FinanceLayout>
        <FinanceScreen tab={ctx!.activeTab} />
      </FinanceLayout>
    </main>
  );
}
