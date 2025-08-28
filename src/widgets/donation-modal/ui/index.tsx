import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DonationPopup } from './donation-popup';

export const DonationModal = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <AnimatePresence>
        {show && <DonationPopup onClose={() => setShow(false)} />}
      </AnimatePresence>
      <div
        className="relative w-full p-5 border border-black/40 rounded-xl flex flex-col items-center justify-center gap-4 overflow-hidden bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/donat-background.png')" }}
      >
        <p className="text-sm text-white/80 font-semibold">
          Do you want to get more rockets?
        </p>
        <button
          className="w-full py-[15px] rounded-lg bg-[linear-gradient(90deg,_#E2C1F9_0%,_#FEBD8E_33%,_#FBFFE4_66%,_#B6D0F7_100%)] text-sm font-semibold text-black"
          onClick={() => setShow(true)}
        >
          Buy some rockets
        </button>
      </div>
    </>
  );
};
