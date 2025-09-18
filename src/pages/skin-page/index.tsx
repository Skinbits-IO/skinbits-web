import { useLocation, useNavigate } from 'react-router';
import { Description, Skin, StandardButton, useBackButton } from '../../shared';
import styles from './SkinPage.module.css';
import { Price, SkinInfo } from './UI';

export const SkinPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  useBackButton();

  if (!state?.skin) {
    navigate('/marketplace');
    return;
  }

  const skin = state.skin as Skin;
  return (
    <div className={styles.background}>
      <SkinInfo skin={skin} />
      <Price price={skin.price} />
      <Description text={skin.description} />
      <StandardButton text="Purchase" onClick={() => {}} />
    </div>
  );
};
