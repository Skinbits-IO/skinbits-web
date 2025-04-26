import styles from './ErrorAlert.module.css';
import { motion } from 'framer-motion';

interface IErrorAlertProps {
  text: string;
}

export const ErrorAlert = ({ text }: IErrorAlertProps) => {
  return (
    <motion.span
      className={styles.background}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <strong>Error Message: </strong>
      {text}
    </motion.span>
  );
};
