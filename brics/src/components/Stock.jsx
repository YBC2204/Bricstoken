import React, { useEffect, useState } from 'react';
import Stockcard from './Stockcard';
import axios from 'axios'
const Stock = () => {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/list/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);
  // const stocks = [
  //   { name: 'Bajaj', price: 14.00, change: 2.34 },
  //   { name: 'Zerodha', price: 23.00, change: -1.2 },
  //   { name: 'Nestle', price: 11.00, change: 0.8 },
  //   { name: 'DMart', price: 17.00, change: -0.5 },
  //   { name: 'Excel', price: 21.00, change: 1.5 },
  //   { name: 'Lotus', price: 13.00, change: -2.0 },
  // ];
  
  return (
    <div className="  px-4  ">
      <h1 className="text-3xl font-bold text-center mb-20">INDIAN STOCK MARKET</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stocks.map((stock, index) => (
          <Stockcard
            key={index}
            id={stock.companyId}
            company={ stock.companyName }
            price={stock.stockPriceInBrics}
            stname={stock.stockName}
          />
        ))}
      </div>
    </div>
  );
};

export default Stock;