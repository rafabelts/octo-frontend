import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';
import { CategoryContainer } from '~/components/category-container';
import { useAppContext } from '~/context/ctxt';

export function CategoriesScreen() {
  const ctx = useAppContext();

  const categories =
    ctx?.activeTab === 0
      ? [
          {
            icon: '🥘',
            label: 'Alimentos',
            color: '#B91F1F',
            path: '/finances/alimentos',
          },
          {
            icon: '🏥',
            label: 'Salud e higiene',
            color: '#281F3D',
            path: '/finances/salud',
          },
          {
            icon: '🧾',
            label: 'Servicios',
            color: '#755BD0',
            path: '/finances/servicios',
          },
          {
            icon: '💻',
            label: 'Trabajo',
            color: '#FFCE1F',
            path: '/finances/trabajo',
          },
        ]
      : [
          {
            icon: '💻',
            label: 'Suscripciones',
            color: '#FFCE1F',
            path: '/finances/suscripciones',
          },
          {
            icon: '📈',
            label: 'Inversiones',
            color: '#281F3D',
            path: '/finances/inversiones',
          },
          {
            icon: '💲',
            label: 'Otros',
            color: '#D4CCF0',
            path: '/finances/otros',
          },
        ];

  return (
    <div>
      <div className="mt-5 mb-2">
        <BackButton path="/finance" />
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
          {categories.map((category) => (
            <CategoryContainer
              key={category.label}
              icon={category.icon}
              label={category.label}
              color={category.color}
              path={category.path}
            />
          ))}
        </div>

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
        </div>
      </main>
    </div>
  );
}
