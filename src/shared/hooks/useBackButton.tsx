import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useBackButton = () => {
  const navigate = useNavigate();
  useEffect(() => {
    WebApp.ready();

    const backButton = WebApp.BackButton;
    const handleBackButtonClick = () => {
      navigate(-1);
    };

    backButton.show();
    backButton.onClick(handleBackButtonClick);

    return () => {
      backButton.hide();
      backButton.offClick(handleBackButtonClick);
    };
  }, []);
};
