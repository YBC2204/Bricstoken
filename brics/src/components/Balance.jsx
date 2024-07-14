import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';

const Balance = () => {
  return (
    
        <div className="flex items-center justify-center h-screen  ">
          <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-[500px] h-[550] border border-white">
          
        <div className="w-full text-center text-white mb-4 flex flex-col">
              <h1 className="text-xl font-bold">Balance</h1>
              <h2 className="text-sm text-gray-400">Tokens</h2>
             <div className='flex  font-semibold hover:cursor-pointer'  
             onClick={() => {
          xmlbalancefn();
          balancefn();
        }}> Refresh Balance<LoopIcon style={{cursor: 'pointer'}} />
        </div>
            </div>
            <div className="w-full">
              <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border-2 border-yellow-300">
                <div className="flex justify-between items-center hover:text-yellow-300">
                  <div className='border-yellow-300'>
                    <h3 className="text-lg font-bold">BRICS</h3>
                    <p className="text-sm text-gray-400">Brics Token</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{balbric !== null ? `${balbric} BRICS` : 'Fetching...'}</p>
                    <p className="text-sm text-gray-400">{balbric !== null ? `$${(balbric * 0.41).toFixed(2)} USD` : '$0.41 USD'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg hover:border-2 border-yellow-300">
                <div className="flex justify-between items-center hover:text-yellow-300">
                  <div>
                    <h3 className="text-lg font-bold">XLM</h3>
                    <p className="text-sm text-gray-400">XLM Token</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold">{xml !== null ? `${xml} XLM` : 'Fetching...'}</p>
                    <p className="text-sm text-gray-400">$1.46 USD</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full">
              <div className="text-blue-500 hover:underline"><AddIcon fontSize='small'></AddIcon> Import tokens</div>
              <div className="text-blue-500 hover:underline mt-2"><QuestionMarkIcon fontSize='small'></QuestionMarkIcon>Brics support</div>
            </div>
          </div>
        </div>
      );
    }
 

export default Balance;