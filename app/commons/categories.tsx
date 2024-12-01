import { CategoryContainer } from '~/components/category-container';

export function CategoriesScreen() {
  return (
    <main>
      <h1>Categorías</h1>

      <p className="text-center text-h4 font-bold text-primary-dark">
        Total gastado en el mes: $1000
      </p>

      <CategoryContainer />
    </main>
  );
}
