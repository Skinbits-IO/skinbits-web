import styles from './CardContainer.module.css';

interface ICardContainer {
  title: string;
  content: React.ReactNode[];
}

export const CardContainer = ({ title, content }: ICardContainer) => {
  return (
    <div className={styles.background}>
      <h5 className={styles.title}>{title}</h5>
      <div className={styles.container}>
        {content.map((item, index) => (
          <div key={index} className={styles.card}>
            {index !== 0 && <div className={styles.devider} />}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
