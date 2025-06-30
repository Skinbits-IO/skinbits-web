import { useLocation, useNavigate } from 'react-router';
import { Skin, useBackButton } from '../../shared';
import styles from './SkinPage.module.css';
import { Price, SkinInfo } from './UI';
import { Description, StandardButton } from '../../components';

export const SkinPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.skin) {
    navigate('/marketplace');
    return;
  }

  const skin = state.skin as Skin;
  useBackButton();

  return (
    <div className={styles.background}>
      <SkinInfo skin={skin} />
      <Price price={skin.price} />
      <Description text={skin.description} />
      <StandardButton text="Purchase" onClick={() => {}} />
    </div>
  );
};
