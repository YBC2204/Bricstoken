import React, { useState } from 'react';

const BuyToken = () => {
  return (
    <div className="btoken-container">
    <div className="card" style={{ display:'flex',alignItems:'center',justifyContent:'center',backgroundColor: '#7563ec', padding: '20px', height:'50vh',borderRadius: '10px' }}>
      
        <div className="mb-3">
          <div className="dropdown drop-item center-item">
            <button name = "country"  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Select Country
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={()=>{country.value="Brazil"}}>Brazil</a></li>
              <li><a className="dropdown-item">India</a></li>
              <li><a className="dropdown-item">United Arab Emirates</a></li>
              <li><a className="dropdown-item">South Africa</a></li>
              <li><a className="dropdown-item">Iran</a></li>
              <li><a className="dropdown-item">Egypt</a></li>
              <li><a className="dropdown-item">Ethopia</a></li>
              <li><a className="dropdown-item">Russia</a></li>
              <li><a className="dropdown-item">China</a></li>
            </ul>
          </div>
          <label htmlFor="exampleInputEmail1" className="form-label center-item">Enter Amount</label>
          <div className="join">
            <div className="grow">
              <div className='center-item drop-item'>
                <input id="amount" name="amount" className="input-bordered center-item input join-item" style={{ width: '50%' }} type="text" placeholder="0.01" />
              </div>
            </div>
            <div className='center-item drop-item'>
            <select id="asset" name="asset" className="select-bordered select join-item" style={{ width: '50%' }}>
              <option value="" disabled="">Select Asset</option>
              <option value="native">XLM</option>
            </select></div>
          </div>
          {/* <input style={{width:'25%'}} className="input-field" type="n" placeholder="Email" /> */}
          <div className='center-item'>
          <button type="button" className="btn btn-outline-danger center-item">Buy Now</button>
          </div>
        </div>
     
    </div>
    </div>
  );
};

export default BuyToken;