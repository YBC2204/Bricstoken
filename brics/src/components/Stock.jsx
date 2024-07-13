import React from 'react'
import Stockcard from './Stockcard';

const Stock = () => {
    const bitcoin = {
        icon: '₿', // Replace with your Bitcoin icon
        name: 'Bitcoin',
        symbol: 'BTC',
      };
  return (
    
    <div>
        <h1>STOCKS</h1>
        
      <Stockcard
        cryptocurrency={bitcoin}
        price={67887.21}
        change={2.34} // If the change is negative, display it as a downward change.
      />
       <Stockcard
        cryptocurrency={bitcoin}
        price={67887.21}
        change={2.34} // If the change is negative, display it as a downward change.
      />
    </div>
    
  )
}

export default Stock
