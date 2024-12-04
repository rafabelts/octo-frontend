import { useParams } from '@remix-run/react';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';

interface Category {
  label: string;
}

export default function CategoryScreen() {
  const { category } = useParams();

  let content = <p>Loading...</p>;

  const categoriesData: { [key: string]: Category } = {
    alimentos: {
      label: 'Alimentos',
    },
    salud: {
      label: 'Salud e higiene',
    },
  };

  if (category && categoriesData[category]) {
    const categoryData = categoriesData[category];

    content = (
      <main>
        {/*<p className="text-h5 font-bold text-primary-dark mb-5 mt-2">
          Total gastado en {`${categoryData.label.toLowerCase()}`}: $1000
        </p>

        <h1 className="mb-5">{categoryData.label}</h1>*/}
        <h1 className="mb-5">{categoryData.label}</h1>
        <p className="text-h5 text-center font-bold text-primary-dark mb-5">
          Total gastado en {`${categoryData.label.toLowerCase()}`}: $1000
        </p>
        <p className="text-title1 text-neutral-normal font-semibold">
          Resumen:
        </p>
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
