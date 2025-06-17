import styles from './FilterButton.module.css';

interface IFilterButtonProps {
  text: string;
  icon?: JSX.Element;
  active?: boolean;
  onClick: () => void;
}

export const FilterButton = ({
  text,
  icon,
  active,
  onClick,
}: IFilterButtonProps) => {
  return (
    <button
      className={styles.background}
      style={{ justifyContent: icon ? 'space-between' : 'center' }}
      onClick={() => onClick()}
    >
      <p>{text}</p>
      <div
        style={{
          transform: active ? 'rotate(180deg)' : undefined,
          transition: 'transform 0.3s ease',
        }}
      >
        {icon}
      </div>
    </button>
  );
};
