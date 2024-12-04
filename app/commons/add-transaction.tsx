import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';
import { CategoryButton } from '~/components/category-button';
import { TextInput } from '~/components/text-input';
import { useAppContext } from '~/context/ctxt';
import { financeSchema } from '~/form-validators/finance-schema';
import { getUserCategories } from '~/services/categories';
import { addTransaction } from '~/services/transactions';
import { CanBeNull, FormFieldProps } from '~/types';
import { TransactionData } from '~/types/finance';

interface ResponseOfCategory {
  categoryId: number;
  color: string;
  icon: string;
  isActive: boolean | null;
  name: string;
  type: string;
  user: number;
  onClick: CanBeNull<() => void>;
}

export function AddTransactionScreen() {
  const ctx = useAppContext();

  const [categories, setCategories] = useState<Array<ResponseOfCategory>>([]);

  const filterByType = (obj: ResponseOfCategory, type: string) => {
    if ('type' in obj && obj.type === type) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function getCategories(user: number) {
      const categories = await getUserCategories(user);
      const type = ctx?.activeTab === 0 ? 'expense' : 'income';

      // filter categories by type
      const filteredCategories = categories.filter(
        (category: ResponseOfCategory) => filterByType(category, type)
      );

      // active the category
      const updatedCategories = filteredCategories.map(
        (category: ResponseOfCategory) => ({
          ...category,
          onClick: () => ctx?.updateCategorySelected(category.name),
        })
      );

      setCategories(updatedCategories);
    }

    getCategories(10000);
  }, []);

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
    const type = ctx?.activeTab === 0 ? 'expense' : 'income';

    await addTransaction(data, type, 10000, 10003);
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
