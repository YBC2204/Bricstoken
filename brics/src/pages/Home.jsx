import React, { useRef } from 'react';
import BuyTokens from '../components/BuyTokens';
import Balance from '../components/Balance';
import Transaction from '../components/Transaction';
import History from '../components/History';
import Stock from '../components/Stock';
import Paypeer from '../components/Paypeer';

import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
  const balanceRef = useRef(null);
  const buyTokensRef = useRef(null);
  const transactionRef = useRef(null);
  const historyRef = useRef(null);
  const stockRef = useRef(null);
  const paypeerRef = useRef(null);

  const sideclass = "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-md hover:underline hover:cursor-pointer";

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='h-screen flex'>
      <div className='fixed bg-gradient-to-br from-blue-900 to-slate-800 w-full sm:w-[20%] h-full flex flex-col gap-3 p-3'>
        <div className='text-center text-white text-xl mb-3 font-bold'>BRICSPAY</div>
        <div className='flex flex-col gap-3'>
          <div className={sideclass} onClick={() => scrollToRef(balanceRef)}>
            <BalanceIcon />
            <div>Balance</div>
          </div>
          <div className={sideclass} onClick={() => scrollToRef(buyTokensRef)}>
            <CurrencyExchangeIcon />
            <div>BuyTokens</div>
          </div>
          <div className={sideclass} onClick={() => scrollToRef(transactionRef)}>
            <MultipleStopIcon />
            <div>Transaction</div>
          </div>
          <div className={sideclass} onClick={() => scrollToRef(historyRef)}>
            <HistoryIcon />
            <div>History</div>
          </div>
          <div className={sideclass} onClick={() => scrollToRef(stockRef)}>
            <TrendingUpIcon />
            <div>Stock</div>
          </div>
        </div>
        <div className='mt-auto text-white text-center'>Footer</div>
      </div>
      <div className='flex flex-col text-white w-full sm:w-[80%] p-5 ml-[20%]' id='contents'>
        <div ref={balanceRef}>
          <Balance />
        </div>
        <div ref={buyTokensRef}>
          <BuyTokens />
        </div>
        <div ref={transactionRef}>
          <Transaction />
        </div>
        <div ref={historyRef}>
          <History />
        </div>
        <div ref={stockRef}>
          <Stock />
        </div>
        <div ref={paypeerRef}>
          <Paypeer />
        </div>
      </div>
    </div>
  );
};

export default Home;
