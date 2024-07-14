import React from 'react'

const Paypeer = () => {
  return (
    <div>
       <div className=" ">
    <div className="  bg-gray-800 border-2 border-white " style={{ display:'flex',alignItems:'center',justifyContent:'center', padding: '20px', height:'50vh',borderRadius: '10px' }}>
      {/* #7563ec */}
        <div className="mb-3 ">
        
          <label htmlFor="exampleInputEmail1" className="form-label center-item font-bold ">Enter Amount</label>
          <div className="join ">
            <div className="grow">
              <div className='center-item drop-item'>
                <input id="amount" name="amount" className="input-bordered center-item input join-item ip-padding" type="text" placeholder="1.00" />
              </div>
              {/* style={{ width: '50%' }} */}
            </div>
            <div className='center-item drop-item'>
            <select id="asset" name="asset" className="select-bordered select join-item ip-padding">
              <option value="" disabled="">Select Asset</option>
              <option value="native">XLM</option>
              <option value="native">BRIC</option>
            </select></div>
          </div>
          {/* <input style={{width:'25%'}} className="input-field" type="n" placeholder="Email" /> */}
          <div className='center-item'>
          <button type="button" className="px-3 py-2 border-2  border-green-700 text-green-600 rounded-lg hover:bg-green-600 hover:text-white font-bold ">Buy Now</button>
          </div>
        </div>
     
    </div>
    </div>
    </div>
  )
}

export default Paypeer
