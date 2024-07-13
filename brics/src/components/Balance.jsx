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
    <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-80 h-96 border border-white">
      <div className="w-full text-center text-white mb-4">
        <LoopIcon style={{cursor: 'pointer'}} onClick={() => {
          xmlbalancefn();
          balancefn();
        }} />
        <h1 className="text-xl font-bold">Balance</h1>
        <h2 className="text-sm text-gray-400">Tokens</h2>
      </div>
      <div className="w-full">
        <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border border-yellow-300">
          <div className="flex justify-between items-center text-white hover:text-yellow-300 cursor-pointer">
            <div>
              <h3 className="text-lg font-bold">BRICS</h3>
              <p className="text-sm text-gray-400">Brics Token</p>
            </div>
            <div>
              <p className="text-lg font-bold">{balbric !== null ? `${balbric} BRICS` : 'Fetching...'}</p>
              <p className="text-sm text-gray-400">{balbric !== null ? `$${(balbric * 0.41).toFixed(2)} USD` : '$0.41 USD'}</p>
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
              <p className="text-lg font-bold">{xml !== null ? `${xml} XLM` : 'Fetching...'}</p>
              <p className="text-sm text-gray-400">$1.46 USD</p>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4 w-full">
        <div className="text-blue-500 hover:underline"><AddIcon /> Import tokens</div>
        <div className="text-blue-500 hover:underline mt-2"><QuestionMarkIcon fontSize='small' /> Brics support</div>
      </div>
    </div>
  );
};

export default Balance;
