import { FieldValues } from 'react-hook-form';
// import { FormFieldProps } from '../../types';

export function FormField<FD extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber = false,
}: FormFieldProps<FD>) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true, valueAsNumber })}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
}
