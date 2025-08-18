import styles from './Description.module.css';

interface IDescriptionProps {
  text: string;
}

export const Description = ({ text }: IDescriptionProps) => {
  return <div className={styles.description}>{text}</div>;
};
