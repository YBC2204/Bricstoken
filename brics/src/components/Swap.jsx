import React from 'react'
import SwapVertIcon from '@mui/icons-material/SwapVert';

const Swap = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-white">
        <h2 className="text-3xl font-bold text-center text-white mb-4 tracking-widest uppercase">Swap</h2>
        <form>
          <div className="mb-4">
           <input type='number'className='py-3 px-16 bg-slate-300 rounded-lg w-full' placeholder='Enter BRICS Amount'></input>
          </div>
          
          <div className="flex justify-center mb-4">
            <SwapVertIcon style={{ fontSize: 40 }} />
          </div>

          <div className="mb-4">
            <label className="text-white mb-2">Select Token</label>
            <select id="token" name="token" className="w-full p-2 rounded-md bg-gray-700 text-white">
              <option value="" disabled selected>Select Token</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Ethereum">Ethereum</option>
              <option value="USDT">USDT</option>
              <option value="BNB">BNB</option>
              <option value="XRP">XRP</option>
            </select>
          </div>

          <p className="text-red-500 text-center mb-4"></p>
          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-green-700 transition duration-300">
              Swap Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Swap;
