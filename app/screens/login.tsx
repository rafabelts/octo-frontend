import { useForm } from 'react-hook-form';
import { Button } from '~/components/button';
import { TextInput } from '~/components/text-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldProps, LogInData } from '~/types';
import { logInSchema } from '~/form-validators';
import { BackButton } from '~/components/back-button';
import { logIn } from '~/services/auth';
import { useNavigate } from '@remix-run/react';
import { toast, Toaster } from 'sonner';

export function LogInScreen() {
  const navigate = useNavigate();

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

  const onSubmit = async (data: LogInData) => {
    const userId = await logIn(data);
    if (userId) {
      sessionStorage.setItem('user_id', userId);
      navigate('/');
    } else {
      toast.error('Error al iniciar sesión');
    }
  };

  return (
    <div id="signup-screen" className="flex flex-col h-screen">
      <div className="mt-5 mb-2">
        <BackButton path="/" />
      </div>

      <main>
        <h1 className="text-h1 ">¡Hola!</h1>
        <p>Ingresa tus datos para continuar</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="signup-form"
          className="flex flex-col mt-6"
        >
          <div className="flex flex-col gap-5 mb-14">
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
          {/*<p className="mb-10 text-body font-bold text-primary-darker text-right">
            Olvide mi contraseña
          </p>*/}

          <Button
            id="signup-button"
            label="Continuar"
            bgColor="bg-primary-normalHover"
            fontColor="text-neutral-light"
            fontSize="text-title1"
          />
          <Toaster />
        </form>
      </main>
    </div>
  );
}
