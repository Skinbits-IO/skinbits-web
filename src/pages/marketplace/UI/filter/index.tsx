import { useDispatch } from 'react-redux';
import { WeaponTypes } from '../../../../shared';
import styles from './Filter.module.css';
import { AppDispatch } from '../../../../store';
import { useSearch } from '../../hooks';
import {
  addWeaponType,
  removeWeaponType,
  resetFilters,
  setQualitiesFilter,
  setRaritiesFilter,
} from '../../../../store/slices/marketplace/searchSlice';
import { FilterButton } from '../filter-button';
import {
  Devider,
  ExchangeIcon,
  OrderIcon,
  StandardButton,
  TrashIcon,
} from '../../../../components';
import { useForm } from 'react-hook-form';
import { FilterInput } from '../filter-input';

export interface FormValues {
  from: number;
  to: number;
}

export const Filter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { weaponTypes, rarities, qualities } = useSearch();
  const allTypes = Object.values(WeaponTypes) as string[];

  const { register } = useForm<FormValues>();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h6>Types</h6>
        <div className={styles.row}>
          {allTypes.map((type) => {
            const weaponType = type as WeaponTypes;
            const selected = weaponTypes.includes(weaponType);

            return (
              <button
                key={type}
                className={styles.typeButton}
                style={{
                  color: selected ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                  backgroundColor: selected
                    ? '#FFFFFF'
                    : 'rgba(217, 217, 217, 0.05)',
                }}
                onClick={() => {
                  if (selected) {
                    dispatch(removeWeaponType(weaponType));
                  } else {
                    dispatch(addWeaponType(weaponType));
                  }
                }}
              >
                {type
                  .toLowerCase()
                  .split('_')
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(' ')}
              </button>
            );
          })}
        </div>
        <div className={styles.typesButtons}>
          <FilterButton
            text="Rarities"
            active={rarities === 'desc'}
            icon={<OrderIcon />}
            onClick={() => {
              dispatch(setRaritiesFilter(rarities === 'desc' ? 'asc' : 'desc'));
            }}
          />
          <FilterButton
            text="Quality"
            active={qualities === 'desc'}
            icon={<OrderIcon />}
            onClick={() => {
              dispatch(
                setQualitiesFilter(qualities === 'desc' ? 'asc' : 'desc')
              );
            }}
          />
        </div>
      </div>
      <Devider />
      <div className={styles.container}>
        <h6>Price</h6>
        <form className={styles.priceInputs}>
          <FilterInput placeholder="From" name="from" register={register} />
          <ExchangeIcon />
          <FilterInput placeholder="To" name="to" register={register} />
        </form>
      </div>
      <div className={styles.buttons}>
        <StandardButton text="Apply" onClick={() => {}} />
        <button
          type="button"
          className={styles.trashButton}
          onClick={() => dispatch(resetFilters())}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
