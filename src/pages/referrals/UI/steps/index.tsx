import { StepBackground } from '../StepBackground';
import styles from './Steps.module.css';

export const Steps = () => {
  const texts = [
    {
      title: 'Share your invitation link',
      description: 'Get a 2,500 / 5,000 (premium) for each fren',
    },
    {
      title: 'Share your invitation link',
      description: 'Get a 2,500 / 5,000 (premium) for each fren',
    },
    {
      title: 'Share your invitation link',
      description: 'Get a 2,500 / 5,000 (premium) for each fren',
    },
  ];

  return (
    <div className={styles.background}>
      {texts.map((value, index) => {
        return (
          <div key={index} className={styles.step}>
            <div className={styles.stepText}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          </div>
        );
      })}
      <StepBackground className={styles.asset} />
    </div>
  );
};
