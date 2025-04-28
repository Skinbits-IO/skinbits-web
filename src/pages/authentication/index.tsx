import { AnimatePresence } from 'framer-motion';
import { ErrorAlert } from '../../components';
import styles from './Authentication.module.css';
import { useLogin } from './hooks/useLogin';
import { useState } from 'react';

export const AuthenticationPage = () => {
  const [text, setText] = useState<string>('');
  const { loginError } = useLogin(setText);

  return (
    <div className={styles.background}>
      <div className={styles.loader}>
        <p>Loading...</p>
        {text}
      </div>
      <AnimatePresence>
        {loginError && <ErrorAlert text={loginError} />}
      </AnimatePresence>
    </div>
  );
};
