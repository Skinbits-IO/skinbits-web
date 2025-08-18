import styles from './LoadMore.module.css';

interface ILoadMoreProps {
  isPending: boolean;
  onClick: () => void;
}

export const LoadMore = ({ isPending, onClick }: ILoadMoreProps) => {
  return (
    <button
      className={styles.background}
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? <span className={styles.loader} /> : 'Load more'}
    </button>
  );
};
