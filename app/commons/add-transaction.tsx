import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BackButton } from '~/components/back-button';
import { Button } from '~/components/button';
import { CategoryButton } from '~/components/category-button';
import { TextInput } from '~/components/text-input';
import { useAppContext } from '~/context/ctxt';
import { financeSchema } from '~/form-validators/finance-schema';
import { FormFieldProps } from '~/types';
import { FinanceData } from '~/types/finance';

export function AddTransactionScreen() {
  const ctx = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof financeSchema>>({
    resolver: zodResolver(financeSchema),
  });

  const financeFields: Array<FormFieldProps<FinanceData>> = [
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

  const onSubmit = (data: FinanceData) => {
    console.log(data);
  };

  const categories =
    ctx?.activeTab === 0
      ? [
          {
            icon: '🥘',
            label: 'Alimentos',
            color: '#B91F1F',
            onClick: () => ctx?.updateCategorySelected('Alimentos'),
          },
          {
            icon: '🏥',
            label: 'Salud e higiene',
            color: '#281F3D',

            onClick: () => ctx?.updateCategorySelected('Salud e higiene'),
          },
          {
            icon: '🧾',
            label: 'Servicios',
            color: '#755BD0',
            onClick: () => ctx?.updateCategorySelected('Servicios'),
          },
          {
            icon: '💻',
            label: 'Trabajo',
            color: '#FFCE1F',
            onClick: () => ctx?.updateCategorySelected('Trabajo'),
          },
        ]
      : [
          {
            icon: '💻',
            label: 'Suscripciones',
            color: '#FFCE1F',
            onClick: () => ctx?.updateCategorySelected('Suscripciones'),
          },
          {
            icon: '📈',
            label: 'Inversiones',
            color: '#281F3D',
            onClick: () => ctx?.updateCategorySelected('Inversiones'),
          },
          {
            icon: '💲',
            label: 'Otros',
            color: '#D4CCF0',
            onClick: () => ctx?.updateCategorySelected('Otros'),
          },
        ];

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
              <CategoryButton key={category.label} {...category} />
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
