import { Route, Routes } from 'react-router';
import {
  AccountPage,
  GameUpgradePage,
  HomePage,
  MarketplacePage,
  RankingPage,
  ReferralsPage,
  SkinPage,
} from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upgrade" element={<GameUpgradePage />} />

      <Route path="/ranking" element={<RankingPage />} />

      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/marketplace/skin-page" element={<SkinPage />} />

      <Route path="/referrals" element={<ReferralsPage />} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
};
