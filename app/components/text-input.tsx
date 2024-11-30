import { FieldValues } from 'react-hook-form';
import { FormFieldProps } from '~/types';

export function TextInput<FD extends FieldValues>({
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
        className="text-title2 font-medium border-neutral-lightActive border p-2 w-full rounded-lg"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true, valueAsNumber })}
      />
      {error && <p className="text-body text-error-normal"> {error.message}</p>}
    </div>
  );
}
