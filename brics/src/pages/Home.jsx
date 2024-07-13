import BuyTokens from '../components/BuyTokens'
import Balance from '../components/Balance'
import Transaction from '../components/Transaction'
import History from '../components/History'
import Stock from '../components/Stock' 

import Paypeer from '../components/Paypeer'

import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
 
    const sideclass = "flex items-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-md hover:underline hover:cursor-pointer"

  return (
    <div className='h-screen flex'>
      <div className='bg-gradient-to-br from-blue-900 to-slate-800 w-full sm:w-[20%] flex flex-col gap-3 p-3'>
        <div className='text-center text-white text-xl mb-3'>LOGO</div>
        <div className='flex flex-col gap-3'>
          <div className={sideclass}>
            <BalanceIcon />
            <div>Balance</div>
          </div>
          <div className={sideclass}>
            <CurrencyExchangeIcon />
            <div>BuyTokens</div>
          </div>
          <div className={sideclass}>
            <MultipleStopIcon />
            <div>Transaction</div>
          </div>
          <div className={sideclass}>
            <HistoryIcon />
            <div>History</div>
          </div>
          <div className={sideclass}>
            <TrendingUpIcon />
            <div>Stock</div>
          </div>
        </div>
        <div className='mt-auto text-white text-center'>Footer</div>
      </div>
      <div className='flex flex-col text-white w-full sm:w-[80%] p-5' id='contents'>
        <div>
          <Balance />
        </div>
        <div>
          <BuyTokens />
        </div>
        <div>
          <Transaction />
        </div>
        <div>
          <History />
        </div>
        <div>
          <Stock />
        </div>
        <div>
          <Paypeer />
        </div>
      </div>
    </div>
  )
}

export default Home

