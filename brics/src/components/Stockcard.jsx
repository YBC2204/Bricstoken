import React from 'react';

const Stockcard = ({ cryptocurrency, price, change }) => {
  return (
    <div className="bg-gray-800 w-80 rounded-lg p-4 mb-4 shadow-md hover:scale-110">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-2">{cryptocurrency.icon}</div>
          <div className="font-bold text-lg">{cryptocurrency.name}</div>
          
        </div>
        <div className={`font-bold  text-lg ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? `+${change}%` : `${change}%`}
        </div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{price} ß</div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Stockcard;