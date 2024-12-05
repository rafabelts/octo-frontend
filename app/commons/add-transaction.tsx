import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';
import { CategoryButton } from '~/components/category-button';
import { TextInput } from '~/components/text-input';
import { useAppContext } from '~/context/ctxt';
import { financeSchema } from '~/form-validators/finance-schema';
import { addTransaction } from '~/services/transactions';
import { FormFieldProps } from '~/types';
import { ResponseOfCategory } from '~/types/category';
import { TransactionData } from '~/types/finance';
import { filterByType } from '~/utils/filterByType';

export function AddTransactionScreen() {
  const navigate = useNavigate();
  const ctx = useAppContext();

  const [categories, setCategories] = useState<Array<ResponseOfCategory>>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();

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

    // active the category
    const updatedCategories = filteredCategories.map(
      (category: ResponseOfCategory) => ({
        ...category,
        onClick: () => {
          ctx?.updateCategorySelected(category.name);
          setSelectedCategory(category.categoryId);
        },
      })
    );

    setCategories(updatedCategories);
  }, [ctx?.activeTab]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof financeSchema>>({
    resolver: zodResolver(financeSchema),
  });

  const financeFields: Array<FormFieldProps<TransactionData>> = [
    {
      type: 'text',
      placeholder: `Título del ${ctx?.activeTab === 0 ? 'gasto' : 'ingreso'}`,
      name: 'title',
      register: register,
      error: errors.title,
    },
    {
      type: 'number',
      placeholder: `Importe del ${ctx?.activeTab === 0 ? 'gasto' : 'ingreso'}`,
      name: 'amount',
      register: register,
      error: errors.amount,
      valueAsNumber: true,
    },
  ];

  const onSubmit = async (data: TransactionData) => {
    const userId = sessionStorage.getItem('user_id');

    if (!userId) return navigate('/');

    const type = ctx?.activeTab === 0 ? 'expense' : 'income';

    if (selectedCategory === undefined) {
      console.error('Category is missing');
      return;
    }

    const parsedId = parseInt(userId);

    await addTransaction(data, type, parsedId, selectedCategory);
  };

  return (
    <div>
      <div className="mt-5 mb-2">
        <BackButton path="/finance" />
      </div>

      <main>
        <h1> Añadir {ctx?.activeTab === 0 ? 'gasto' : 'importe'} </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 mb-3">
            {financeFields.map((field) => (
              <TextInput
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                register={field.register}
                error={field.error}
                valueAsNumber={field.valueAsNumber}
              />
            ))}
          </div>

          <h2 className="text-title1 font-bold text-primary-dark mt-5">
            Categoría:
          </h2>
          <div className="grid grid-cols-4 mb-10 gap-2">
            {categories.map((category) => (
              <CategoryButton key={category.name} {...category} />
            ))}
          </div>

          <Button
            type="submit"
            id="signup-button"
            label="Continuar"
            bgColor="bg-primary-normalHover"
            fontColor="text-neutral-light"
            fontSize="text-title1"
          />
        </form>
      </main>
    </div>
  );
}
