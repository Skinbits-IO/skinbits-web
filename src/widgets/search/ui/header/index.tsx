import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Header.module.css';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../shared';
import { setSearchQuery } from '../../model';
import { FilterIcon } from '../filter-icon';
import { SearchIcon } from '../search-icon';

interface FormValues {
  searchQuery: string;
}

interface IHeaderProps {
  filterActive: boolean;
  onFilterTap: () => void;
}

export const Header = ({ filterActive, onFilterTap }: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { searchQuery: '' },
  });

  // subscribe to changes in searchQuery
  const searchQuery = watch('searchQuery');
  useEffect(() => {
    dispatch(setSearchQuery(searchQuery));
  }, [searchQuery]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    dispatch(setSearchQuery(data.searchQuery));
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputWrapper}>
          <SearchIcon className={styles.inputIcon} />
          <input
            id="searchQuery"
            type="text"
            placeholder="Search item..."
            className={styles.inputWithIcon}
            {...register('searchQuery')}
          />
        </div>
      </form>
      <button
        className={styles.button}
        style={{
          backgroundColor: filterActive
            ? 'rgba(217, 217, 217, 1)'
            : 'rgba(217, 217, 217, 0.03)',
        }}
        onClick={() => onFilterTap()}
      >
        <FilterIcon
          color={filterActive ? '#000000' : '#FFFFFF'}
          opacity={filterActive ? 1 : 0.5}
        />
      </button>
    </div>
  );
};
