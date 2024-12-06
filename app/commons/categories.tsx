import { useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';
import { CategoryContainer } from '~/components/category-container';
import { useAppContext } from '~/context/ctxt';
import { ResponseOfCategory } from '~/types/category';
import { filterByType } from '~/utils/filterByType';

export function CategoriesScreen() {
  const navigate = useNavigate();
  const ctx = useAppContext();

  const [categories, setCategories] = useState<Array<ResponseOfCategory>>([]);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (!userId) navigate('/');

    const type = ctx?.activeTab === 0 ? 'expense' : 'income';
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
  }, [ctx?.activeTab]);

  return (
    <div>
      <div className="mt-5 mb-2">
        <BackButton path="/" />
      </div>
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
        }}
      >
        <h1 className="mb-5">Categorías</h1>

        <p className="text-center text-h4 font-bold text-primary-dark mb-10">
          Total {ctx?.activeTab === 0 ? 'gastado' : 'recibido'} en el mes: $1000
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // Two equal-width columns
            gap: '24px',
            margin: '0 auto',
          }}
        >
          {categories.map((category: ResponseOfCategory) => {
            const path = category.name.split(' ')[0];

            return (
              <CategoryContainer
                key={category.name}
                icon={category.icon}
                label={category.name}
                color={category.color}
                path={`/finances/${path.toLocaleLowerCase()}`}
              />
            );
          })}
        </div>

        {/*
          <div
            className="flex flex-row gap-3"
            style={{ marginTop: 'auto' }}
            id="more-info-buttons"
          >
            <Button
              id="create-account-button"
              label="Informes pasados"
              border="border border-primary-normalHover"
              bgColor=""
              fontColor="text-primary-normalHover"
              fontSize="text-title1"
            />
            <Button
              id="create-account-button"
              label="Generar reporte"
              bgColor="bg-primary-normalHover"
              fontColor="text-neutral-light"
              fontSize="text-title1"
            />
          </div>*/}
      </main>
    </div>
  );
}
