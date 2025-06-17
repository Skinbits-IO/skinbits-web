import { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import styles from './FilterInput.module.css';

interface IFilterInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
}

export function FilterInput<TFieldValues extends FieldValues>({
  name,
  placeholder,
  register,
}: IFilterInputProps<TFieldValues>) {
  const id = `filter-${String(name)}`;

  return (
    <input
      id={id}
      type="number"
      placeholder={placeholder}
      className={styles.input}
      {...register(name)}
    />
  );
}
