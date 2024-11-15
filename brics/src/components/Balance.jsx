import React, { useState } from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import axios from 'axios';

const Balance = () => {
  const [balbric, setBalbric] = useState(null);
  const [xml, setXml] = useState(null);
  const [error, setError] = useState('');

  const balancefn = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/token/balance/bric', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const balance = response.data.bricBalance.balance;
      setBalbric(balance);
      console.log(balance);
    } catch (error) {
      console.error('Balance failed:', error);
      setError('Balance failed. Please try again later.');
    }
  };

  const xmlbalancefn = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/token/balance/xml', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const xmlbalance = response.data.xmlBalance.balance;
      setXml(xmlbalance);
      console.log(xmlbalance);
    } catch (error) {
      console.error('Balance failed:', error);
      setError('Balance failed. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-[450px] h-[950] border-2 border-white">
        <div className="w-full text-center text-white mb-4 flex flex-col">
          <h1 className="text-3xl font-bold tracking-widest uppercase">Balance</h1>
          <h2 className="text-sm text-gray-400 mb-3">Tokens</h2>
          <div className='flex items-center font-semibold hover:cursor-pointer hover:text-purple-600 justify-center' onClick={() => { xmlbalancefn(); balancefn(); }}>
            Refresh Balance <LoopIcon style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border-2 border-purple-600 hover:scale-105">
            <div className="flex justify-between items-center hover:text-purple-600">
              <div>
                <h3 className="text-lg font-bold">BRICS</h3>
                <p className="text-sm text-gray-400">Brics Token</p>
              </div>
              <div>
                <p className="text-lg font-bold">{balbric !== null ? `${balbric} BRICS` : 'Fetching...'}</p>
              
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg hover:border-2 border-purple-600 hover:scale-105">
            <div className="flex justify-between items-center hover:text-purple-600">
              <div>
                <h3 className="text-lg font-bold">XLM</h3>
                <p className="text-sm text-gray-400">XLM Token</p>
              </div>
              <div>
                <p className="text-lg font-bold">{xml !== null ? `${xml} XLM` : 'Fetching...'}</p>
                
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-end space-y-2">
          <div className="text-purple-600 hover:underline flex items-center">
            <AddIcon fontSize='small' className='mr-1' />
            Import tokens
          </div>
          <div className="text-purple-600 hover:underline flex items-center">
            <QuestionMarkIcon fontSize='small' className='mr-1' />
            Brics support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
