import { motion } from 'framer-motion';
import styles from './SteamPopup.module.css';
import { PopupButton, PopupCloseButton } from '../../../../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSaveTradeLink } from '../../hooks';
import WebApp from '@twa-dev/sdk';
import { YOUTUBE_URL } from '../../../../shared';

interface ISteamPopupProps {
  onClose: () => void;
}

interface FormValues {
  tradeLink: string;
}

const steamTradeLinkRegex =
  /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[A-Za-z0-9]+$/;

function isValidSteamTradeLink(link: string): boolean {
  return steamTradeLinkRegex.test(link);
}

export const SteamPopup = ({ onClose }: ISteamPopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { mutate } = useSaveTradeLink(onClose);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data.tradeLink);
  };

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <PopupCloseButton onTap={onClose} />
        <div className={styles.steam} />
        <div className={styles.tutorial}>
          <h5>Paste steam trade link</h5>
          <p>{`Go to you Steam profile -> Inventory -> Trade Offers -> Who can send me Trade Offers -> Third-Party Sites (Copy link)`}</p>
          <button onClick={() => WebApp.openLink(YOUTUBE_URL)}>
            YouTube Tutorial
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            id="tradeLink"
            type="text"
            placeholder="Your Steam trade link"
            className={styles.input}
            style={errors.tradeLink ? { borderColor: '#ff6b6b' } : {}}
            {...register('tradeLink', {
              required: 'Trade link is required',
              validate: (val) =>
                isValidSteamTradeLink(val) ||
                'Must be a Steam trade URL like https://steamcommunity.com/tradeoffer/new/?partner=123456&token=ABCDEFGH',
            })}
          />
          {errors.tradeLink && (
            <p className={styles.error}>{errors.tradeLink.message}</p>
          )}
          <PopupButton text={'Save'} isRequestPending={isSubmitting} />
        </form>
      </motion.div>
    </>
  );
};
