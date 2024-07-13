import React, { useState } from 'react';
import axios from 'axios';

const BuyToken = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/token/buy-token',
        { amount: amount },
        {
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );
      // Handle response
    } catch (error) {
      console.error('Buy Token failed:', error);
      setError('Buy Token failed. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">BUY BRIC TOKEN</h1>
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <select
            className="bg-gray-900 text-white rounded-lg px-4 py-2 w-full focus:outline-none transition duration-300 hover:bg-gray-700"
            aria-label="Select Country"
          >
            <option disabled selected>Select Country</option>
            <option value="Brazil">Brazil</option>
            <option value="Russia">Russia</option>
            <option value="India">India</option>
            <option value="China">China</option>
            <option value="South Africa">South Africa</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="Iran">Iran</option>
            <option value="Egypt">Egypt</option>
            <option value="Ethopia">Ethopia</option>
          </select>
          <label htmlFor="amount" className="block text-white mt-4">Enter Amount</label>
          <div className="flex gap-2">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="amount"
              name="amount"
              className="bg-gray-900 text-white rounded-lg px-4 py-2 w-1/2 focus:outline-none transition duration-300 hover:bg-gray-700"
              type="text"
              placeholder="1.00"
            />
            <select
              id="asset"
              name="asset"
              className="bg-gray-900 text-white rounded-lg px-4 py-2 w-1/2 focus:outline-none transition duration-300 hover:bg-gray-700"
            >
              <option value="" disabled>Select Asset</option>
              <option value="native">XLM</option>
              <option value="native">BRIC</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 mt-4 w-full focus:outline-none transition duration-300"
            onClick={handleSubmit}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyToken;