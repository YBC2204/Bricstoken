import React from 'react';

const Stockcard = ({ id,company,price,stname}) => {
  return (
    <div className="bg-gray-800 w-80 rounded-lg p-4 mb-4 shadow-md hover:scale-110 flex flex-col">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <div className="text-2xl mr-2">{cryptocurrency.icon}</div>
          <div className="font-bold text-lg text-purple-600">{cryptocurrency.name}</div>
          
        
        <div className={`font-bold  text-lg  text-blue-800`}>
          {stname}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold mb-4">{price} ß</div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Buy Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default Stockcard;