import {
  FieldError,
  FieldValues,
  UseFormRegister,
  Path,
} from 'react-hook-form';

// VF for the valid form names and FD for the field values (example, the BookFormData interface)
export interface FormFieldProps<FD extends FieldValues> {
  type: string;
  placeholder: string;
  name: Path<FD>;
  register: UseFormRegister<FD>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
}

export * from './user';
