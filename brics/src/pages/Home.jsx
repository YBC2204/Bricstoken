import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyTokens from '../components/BuyTokens';
import Balance from '../components/Balance';
import Transaction from '../components/Transaction';
import History from '../components/History';
import Stock from '../components/Stock';
import Swap from '../components/Swap';
import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SwapVertIcon from '@mui/icons-material/SwapVert';
const Home = () => {
  const [selected, setSelected] = useState('Balance');
  const balanceRef = useRef(null);
  const buyTokensRef = useRef(null);
  const transactionRef = useRef(null);
  const historyRef = useRef(null);
  const stockRef = useRef(null);
  const swapRef = useRef(null);
  const nav = useNavigate();

  const sideclass = "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-md hover:cursor-pointer";

  const scrollToRef = (ref, name) => {
    setSelected(name);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='h-screen flex overflow-hidden'>
      <div className='fixed bg-gradient-to-br from-slate-900 to-slate-800 w-full sm:w-[20%] h-full flex flex-col gap-3 p-3'>
        <div className='text-center text-white text-4xl mb-5 mt-5 font-bold'>ßRICSPAY</div>
        <div className='flex flex-col gap-3'>
          <div className={`${sideclass} ${selected === 'Balance' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(balanceRef, 'Balance')}>
            <BalanceIcon />
            <div>Balance</div>
          </div>
          <div className={`${sideclass} ${selected === 'BuyTokens' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(buyTokensRef, 'BuyTokens')}>
            <CurrencyExchangeIcon />
            <div>Buy Tokens</div>
          </div>
          <div className={`${sideclass} ${selected === 'Transaction' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(transactionRef, 'Transaction')}>
            <MultipleStopIcon />
            <div>Transaction</div>
          </div>
          <div className={`${sideclass} ${selected === 'History' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(historyRef, 'History')}>
            <HistoryIcon />
            <div>History</div>
          </div>
          <div className={`${sideclass} ${selected === 'Stock' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(stockRef, 'Stock')}>
            <TrendingUpIcon />
            <div>Stock</div>
          </div>
          <div className={`${sideclass} ${selected === 'Swap' ? 'border-b-4 border-purple-600' : ''}`} onClick={() => scrollToRef(swapRef, 'Swap')}>
            <SwapVertIcon />
            <div>Swap</div>
          </div>
        </div>
        <div className="absolute bottom-0 bg-white text-black font-bold py-3 hover:bg-black hover:text-white hover:cursor-pointer px-14 rounded text-center my-4 left-14" onClick={() => nav('/')}>
          Sign Out
        </div>
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
        <div ref={swapRef}>
          <Swap />
        </div>
      </div>
    </div>
  );
};

export default Home;
