import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Por favor, ingresa tu nombre' }),
    email: z
      .string()
      .min(1, {
        message: 'Por favor, ingresa tu correo electrónico',
      })
      .email({ message: 'Por favor, ingresa un correo electrónico valido' }),
    password: z
      .string()
      .min(1, { message: 'Por favor, ingresa una contraseña' })
      .refine((password) => password.length <= 14 && password.length >= 8, {
        message: 'La contraseña debe tener una longitud de 8 a 14 carácteres',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export const logInSchema = z.object({
  email: z.string().min(1, {
    message: 'Por favor, ingresa tu correo electrónico',
  }),
  password: z.string().min(1, { message: 'Por favor, ingresa tu contraseña' }),
});
