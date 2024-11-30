import { useForm } from 'react-hook-form';
import { Button } from '~/components/button';
import { TextInput } from '~/components/text-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldProps, LogInData, SignUpData } from '~/types';
import { logInSchema, signUpSchema } from '~/form-validators';

export default function LogInScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  const logInFields: Array<FormFieldProps<LogInData>> = [
    {
      type: 'text',
      placeholder: 'Correo electrónico',
      name: 'email',
      register: register,
      error: errors.email,
    },

    {
      type: 'password',
      placeholder: 'Contraseña',
      name: 'password',
      register: register,
      error: errors.password,
    },
  ];

  const onSubmit = (data: LogInData) => {
    //    const loadingToast = toast.loading('Añadiendo libro...');
    console.log(data);
  };

  return (
    <main id="signup-screen" className="flex flex-col h-screen">
      <h1 className="text-h1 ">¡Hola!</h1>
      <p>Ingresa tus datos para continuar</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="signup-form"
        className="flex flex-col mt-6"
      >
        <div className="flex flex-col gap-5 mb-3">
          {logInFields.map((field) => (
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
        <p className="mb-10 text-body font-bold text-primary-darker text-right">
          Olvide mi contraseña
        </p>

        <Button
          id="signup-button"
          label="Continuar"
          bgColor="bg-primary-normalHover"
          fontColor="text-neutral-light"
          fontSize="text-title1"
        />
      </form>
    </main>
  );
}
