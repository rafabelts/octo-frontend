import { useForm } from 'react-hook-form';
import { Button } from '~/components/button';
import { TextInput } from '~/components/text-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormFieldProps, SignUpData } from '~/types';
import { signUpSchema } from '~/form-validators';
import { BackButton } from '~/components/back-button';

export function SignUpScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const signUpFields: Array<FormFieldProps<SignUpData>> = [
    {
      type: 'text',
      placeholder: 'Nombre',
      name: 'name',
      register: register,
      error: errors.name,
    },
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
    {
      type: 'password',
      placeholder: 'Confirmar contraseña',
      name: 'confirmPassword',
      register: register,
      error: errors.confirmPassword,
    },
  ];

  const onSubmit = (data: SignUpData) => {
    //    const loadingToast = toast.loading('Añadiendo libro...');
    console.log(data);
  };

  return (
    <div id="signup-screen" className="flex flex-col h-screen">
      <div className="mt-5 mb-2">
        <BackButton path="/" />
      </div>
      <main>
        <h1 className="text-h1 ">¡Hola!</h1>
        <p>Rellena los siguientes campos para continuar</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="signup-form"
          className="flex flex-col mt-6"
        >
          <div className="flex flex-col gap-5 mb-2">
            {signUpFields.map((field) => (
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

          <span className="text-caption text-neutral-normal mb-8">
            Al continuar, aceptas nuestro <b>Acuerdo de Usuario</b> y reconoces
            que comprendes la <b>Política de Privacidad</b>
          </span>

          <Button
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
