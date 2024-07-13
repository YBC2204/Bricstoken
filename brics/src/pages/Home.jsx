import BuyTokens from '../components/BuyTokens'
import Balance from '../components/Balance'
import Transaction from '../components/Transaction'
import History from '../components/History'
import Stock from '../components/Stock' 
import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Home = () => {
 
    const sideclass ="flex gap-2 hover:underline hover:cursor-pointer"

  return (
    <div className=' h-screen flex'>
      <div className='bg-gradient-to-br from-blue-900 to-slate-800 w-[20%] flex flex-col gap-3'>
<div>LOGO</div>
<div className='flex flex-col gap-3'>
   <div className={sideclass}>
     <BalanceIcon/>
     <div>Balance</div>
   </div>
   <div className={sideclass}>
   <CurrencyExchangeIcon/>
     <div>BuyTokens</div>
   </div>
   <div className={sideclass}>
     <MultipleStopIcon/>
     <div>Transaction</div>
   </div>
   <div className={sideclass}>
     <HistoryIcon/>
     <div>History</div>
   </div>
   <div className={sideclass}>
     <TrendingUpIcon/>
     <div>Stock</div>
   </div>
</div>
<div className=' absolute bottom-0'>Footer</div>
      </div>
      <div className='flex flex-col text-white w-[80%] ' id='contents'>
       <div>
        <Balance/>
       </div>
       <div>
         <BuyTokens/>
       </div>
       <div>
         <Transaction/>
       </div>
       <div>
        <History/>
       </div>
       <div>
        <Stock/>
       </div>
      </div>
     
     
    </div>
  )
}

export default Home
