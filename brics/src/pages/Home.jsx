import BuyTokens from '../components/BuyTokens'
import Balance from '../components/Balance'
import Transaction from '../components/Transaction'
import History from '../components/History'
import Stock from '../components/Stock' 

const Home = () => {
 

  return (
    <div className=' h-screen flex'>
      <div className='bg-blue-900 w-1/4 '></div>
      <div className='flex flex-col text-white w-3/4'>
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
