import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
const Balance = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-80 h-96 border border-white">
      <div className="w-full text-center text-white mb-4">
        <h1 className="text-xl font-bold">Balance</h1>
        <h2 className="text-sm text-gray-400">Tokens</h2>
      </div>
      <div className="w-full">
        <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border border-yellow-300 ">
          <div className="flex justify-between items-center text-white hover:text-yellow-300">
            <div className=''>
              <h3 className="text-lg font-bold ">BRICS</h3>
              <p className="text-sm text-gray-400">Brics Token</p>
            </div>
            <div>
              <p className="text-lg font-bold">0.0001 BRICS</p>
              <p className="text-sm text-gray-400">$0.41 USD</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg hover:border border-yellow-300">
          <div className="flex justify-between items-center text-white hover:text-yellow-300">
            <div>
              <h3 className="text-lg font-bold">XLM</h3>
              <p className="text-sm text-gray-400">XLM Token</p>
            </div>
            <div>
              <p className="text-lg font-bold">1.46 XLM</p>
              <p className="text-sm text-gray-400">$1.46 USD</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full ">
       
        <div className="text-blue-500 hover:underline"><AddIcon fontSize=''></AddIcon> Import tokens</div>
  
        <div className="text-blue-500 hover:underline mt-2"><QuestionMarkIcon fontSize='sm'></QuestionMarkIcon>Brics support</div>
      </div>
    </div>
  );
}

export default Balance;
