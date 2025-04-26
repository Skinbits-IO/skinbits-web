import { AnimatePresence } from 'framer-motion';
import { ErrorAlert } from '../../components';
import styles from './Authentication.module.css';
import { useLogin } from './hooks/useLogin';

export const AuthenticationPage = () => {
  const { loginError } = useLogin();

  return (
    <div className={styles.background}>
      <div className={styles.loader}>Loading...</div>
      <AnimatePresence>
        {loginError && <ErrorAlert text={loginError} />}
      </AnimatePresence>
    </div>
  );
};
